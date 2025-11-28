import { useState, useEffect } from "react";
import type { Todo, TodoInfo } from "../types/types";
import TodoList from "../components/TodoList";
import CreateTodo from "../components/CreateTodo";
import { todoInfoFilterEnum } from "../types/types";
import { getTodos } from "../api";

export const BASE_URL = "https://easydev.club/api/v1";

const TodosPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todoTitleValue, setTodoTitleValue] = useState<string>("");
  const [todoFilter, setTodoFilter] = useState<todoInfoFilterEnum>(
    todoInfoFilterEnum.all
  );

  useEffect(() => {
    getTodos().then((todos) => {
      if (todos) {
        setTodos(todos.data);
      }
    });
  }, []);

  return (
    <div className="container">
      {!isLoading ? (
        <>
          <CreateTodo
            setInfo={setInfo}
            todoFilter={todoFilter}
            todoTitleValue={todoTitleValue}
            setTodoTitleValue={setTodoTitleValue}
            setTodos={setTodos}
          ></CreateTodo>
          <TodoList
            todos={todos}
            info={info}
            setTodos={setTodos}
            setInfo={setInfo}
            setTodoFilter={setTodoFilter}
            todoFilter={todoFilter}
            setIsLoading={setIsLoading}
          ></TodoList>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default TodosPage;
