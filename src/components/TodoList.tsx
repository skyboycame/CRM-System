import {useEffect} from "react";
import type { Todo, TodoInfo } from "../types/types";
import TodoListItem from "./TodoListItem";
import type { Filter } from "../types/types";
import { fetchData } from "../api";



interface TodoListProps {
  todos: Todo[];
  info: TodoInfo
  setData: React.Dispatch<React.SetStateAction<Todo[]>>,
  setInfo: React.Dispatch<React.SetStateAction<TodoInfo>>
  setFilter: React.Dispatch<React.SetStateAction<Filter>>,
  setIsLoading:  React.Dispatch<React.SetStateAction<boolean>>
  filter: Filter,
}

const TodoList = ({
  todos,
  info,
  setData,
  setInfo,
  setFilter,
  filter,
  setIsLoading
}: TodoListProps) => {

 
  

  const handleFilterAll = () => {
    setFilter("all");
  };

  const handleFilterInWork = () => {
    setFilter("inWork");
  };

  const handleFilterCompleted = () => {
    setFilter("completed");
  };


  useEffect(() => {
    fetchData(setData,setInfo,setIsLoading,filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])
  
  

  return (
    <>
      <div className="todo__buttons-container">
        <button onClick={handleFilterAll}>Все {`(${info.all})`}</button>
        <button onClick={handleFilterInWork}>
          В работе {`(${info.inWork})`}
        </button>
        <button onClick={handleFilterCompleted}>
          Выполнено {`(${info.completed})`}
        </button>
      </div>

      <ul className="todo__list">
        {todos
          .sort(
            (a, b) =>
              new Date(b.created).getTime() - new Date(a.created).getTime()
          )
          .map((todo) => (
            <TodoListItem
              key={todo.id} 
              {...todo}
              setData={setData}
              setInfo={setInfo}
              filter={filter}
            ></TodoListItem>
          ))}
      </ul>
    </>
  );
};

export default TodoList;
