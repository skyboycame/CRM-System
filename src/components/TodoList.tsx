import { useState } from "react";
import type { Todo } from "../types/types";
import TodoListItem from "./TodoListItem";

type Filter = "all" | "inWork" | "done";

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: number) => Promise<void>;
  changeHadler: (id: number, updatedData: Partial<Todo>) => void;
  valitateTitle: (title: string) => boolean;
}

const TodoList = ({
  valitateTitle,
  todos,
  deleteTodo,
  changeHadler,
}: TodoListProps) => {
  const [filter, setFilter] = useState<Filter>("all");

  const allHandler = () => {
    setFilter("all");
  };

  const InWorkHandler = () => {
    setFilter("inWork");
  };

  const DoneHandler = () => {
    setFilter("done");
  };

  return (
    <>
      <div className="todo__buttons-container">
        <button onClick={allHandler}>Все {`(${todos.length})`}</button>
        <button onClick={InWorkHandler}>
          В работе {`(${todos.filter((todo) => todo.isDone === false).length})`}
        </button>
        <button onClick={DoneHandler}>
          Выполнено {`(${todos.filter((todo) => todo.isDone === true).length})`}
        </button>
      </div>

      <ul className="todo__list">
        {todos
          .filter((todo) => {
            if (filter === "all") {
              return true;
            }
            if (filter === "inWork") {
              return todo.isDone === false;
            }
            if (filter === "done") {
              return todo.isDone === true;
            }
          })
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
