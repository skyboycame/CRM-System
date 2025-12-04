import { useState, useEffect } from "react";
import type { Todo, TodoInfo } from "../types/types";
import TodoList from "../components/TodoList";
import CreateTodo from "../components/CreateTodo";
import { todoInfoFilterEnum } from "../types/types";
import { createNewTodo, deleteTodo, getTodos, updateTodo } from "../api";
import FilterButtons from "../components/FilterButtons";

export const BASE_URL = "https://easydev.club/api/v1";

const TodosPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [todoTitleValue, setTodoTitleValue] = useState<string>("");
  const [todoFilter, setTodoFilter] = useState<todoInfoFilterEnum>(
    todoInfoFilterEnum.all
  );

  const handleAddTodo = (title: string) => {
    return createNewTodo({ title, isDone: false })
      .then((newTodo) => {
        setTodos((todos) => [...todos, newTodo]);
        return getTodos(todoFilter);
      })
      .then((todos) => {
        if (todos && todos.info) {
          setInfo(todos.info);
        }
        setTodoTitleValue("");
      })
      .catch((error) => {
        console.error("Ошибка при создании задачи:", error);
        alert("Не удалось создать задачу");
        throw error;
      });
  };

  const GetTodoByFilter = (filter: todoInfoFilterEnum) => {
    setTodoFilter(filter);
  };

  const handleDeleteButton = (todo: Todo) => {
    return deleteTodo(todo.id)
      .then(() => {
        setTodos((data) => data.filter((item) => item.id !== todo.id));
        return getTodos(todoFilter);
      })
      .then((todos) => {
        if (todos && todos.info) {
          setTodos(todos.data);
          setInfo(todos.info);
        }
      })
      .catch((error) => {
        console.error("Ошибка при создании задачи:", error);
        alert("Не удалось создать задачу");
        throw error;
      });
  };

  const checkboxCheckedChange = (todo: Todo) => {
    return updateTodo(todo.id, { isDone: !todo.isDone })
      .then((result) => {
        setTodos((data) =>
          data.map((item) => (item.id === todo.id ? result : item))
        );
        return getTodos(todoFilter);
      })
      .then((todos) => {
        if (todos && todos.info) {
          setInfo(todos.info);
          setTodos(todos.data);
        }
      })
      .catch((error) => {
        console.error("Ошибка при создании задачи:", error);
        alert("Не удалось создать задачу");
        throw error;
      });
  };

  const updateTodosAfterEdit = (todo: Todo, todoTitle: string) => {
    return updateTodo(todo.id, { title: todoTitle })
      .then((result) => {
        setTodos((data) =>
          data.map((item) => (item.id === todo.id ? result : item))
        );
        return getTodos(todoFilter);
      })
      .then((todos) => {
        if (todos && todos.info) {
          setTodos(todos.data);
          setInfo(todos.info);
        }
      })
      .catch((error) => {
        console.error("Ошибка при создании задачи:", error);
        alert("Не удалось создать задачу");
        throw error;
      });
  };

  useEffect(() => {
    getTodos(todoFilter).then((todos) => {
      if (todos && todos.info) {
        setTodos(todos.data);
        setInfo(todos.info);
      }
    });
  }, [todoFilter]);

  return (
    <div className="container">
      <CreateTodo
        todoTitleValue={todoTitleValue}
        setTodoTitleValue={setTodoTitleValue}
        onAddTodo={handleAddTodo}
      ></CreateTodo>
      <FilterButtons
        GetTodoByFilter={GetTodoByFilter}
        info={info}
        todoFilter={todoFilter}
      ></FilterButtons>
      <TodoList
        updateTodosAfterEdit={updateTodosAfterEdit}
        checkboxCheckedChange={checkboxCheckedChange}
        handleDeleteButton={handleDeleteButton}
        todos={todos}
      ></TodoList>
    </div>
  );
};

export default TodosPage;
