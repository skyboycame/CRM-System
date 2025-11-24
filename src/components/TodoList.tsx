import { useEffect } from "react";
import { todoInfoFilterEnum, type Todo, type TodoInfo } from "../types/types";
import TodoListItem from "./TodoListItem";
import { getTodos } from "../api";

interface props {
  todos: Todo[];
  info: TodoInfo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setInfo: React.Dispatch<React.SetStateAction<TodoInfo>>;
  setTodoFilter: React.Dispatch<React.SetStateAction<todoInfoFilterEnum>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  todoFilter: todoInfoFilterEnum;
}

const TodoList = ({
  todos,
  info,
  setTodos,
  setInfo,
  setTodoFilter,
  todoFilter,
}: props) => {

  const handleFilter = (filter: todoInfoFilterEnum) => {
    setTodoFilter(filter)
  }

  useEffect( () => {
   getTodos(todoFilter)
         .then(todos => {
           if(todos && todos.info) {
             setTodos(todos.data)
             setInfo(todos.info)
           }
         })
       
  },[todoFilter, setTodos, setInfo]);

  return (
    <>
      <div className="todo__buttons-container">
        <button onClick={() => handleFilter(todoInfoFilterEnum.all)}>All {`(${info.all})`}</button>
        <button onClick={() => handleFilter(todoInfoFilterEnum.inWork)}>
          inWork {`(${info.inWork})`}
        </button>
        <button onClick={() => handleFilter(todoInfoFilterEnum.completed)}>
          Completed {`(${info.completed})`}
        </button>
      </div>

      <ul className="todo__list">
        {todos
          .map((todo) => (
            <TodoListItem
              key={todo.id}
              id={todo.id}
              isDone={todo.isDone}
              title={todo.title}
              setTodos={setTodos}
              setInfo={setInfo}
              todoFilter={todoFilter}
            ></TodoListItem>
          ))}
      </ul>
    </>
  );
};

export default TodoList;
