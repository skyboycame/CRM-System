import {useEffect} from "react";
import type { Todo, TodoInfo } from "../types/types";
import TodoListItem from "./TodoListItem";
import type { Filter } from "../App";



interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: number) => Promise<void>;
  changeHadler: (id: number, updatedData: Partial<Todo>) => void;
  valitateTitle: (title: string) => boolean;
  fetchFilter: (status: Filter) => void
  info: TodoInfo
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
  filter: Filter
}

const TodoList = ({
  valitateTitle,
  todos,
  deleteTodo,
  changeHadler,
  fetchFilter,
  info,
  setFilter,
  filter
}: TodoListProps) => {

 
  

  const allHandler = () => {
    setFilter("all");
  };

  const InWorkHandler = () => {
    setFilter("inWork");
  };

  const DoneHandler = () => {
    setFilter("completed");
  };


  useEffect(() => {
    fetchFilter(filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])
  
  

  return (
    <>
      <div className="todo__buttons-container">
        <button onClick={allHandler}>Все {`(${info.all})`}</button>
        <button onClick={InWorkHandler}>
          В работе {`(${info.inWork})`}
        </button>
        <button onClick={DoneHandler}>
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
              deleteTodo={deleteTodo}
              {...todo}
              changeHadler={changeHadler}
              valitateTitle={valitateTitle}
            ></TodoListItem>
          ))}
      </ul>
    </>
  );
};

export default TodoList;
