import { useState, useEffect } from "react";
import type { TempTodo, Todo, TodoInfo } from "../../types/types";
import TodoList from "../../components/TodoList/TodoList";
import CreateTodo from "../../components/CreateTodo/CreateTodo";
import { TodoInfoFilterEnum } from "../../types/types";
import { createNewTodo, deleteTodo, getTodos, updateTodo } from "../../api";
import FilterButtons from "../../components/FilterButtons/FilterButtons";

export const BASE_URL = "https://easydev.club/api/v1";

const TodosPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [todoTitleValue, setTodoTitleValue] = useState<string>("");
  const [todoFilter, setTodoFilter] = useState<TodoInfoFilterEnum>(
    TodoInfoFilterEnum.ALL
  );

  const updateStatistics = (todosList: Todo[]) => {
    const all = todosList.length;
    const completed = todosList.filter((todo) => todo.isDone).length;
    const inWork = all - completed;
    setInfo({ all, completed, inWork });
  };

  const handleAddTodo = (title: string) => {
    const tempId = Date.now();
    const tempTodo: TempTodo = {
      id: tempId,
      title,
      isDone: false,
      created: new Date().toISOString(),
    };
    const optimisticTodos = [...todos, tempTodo as Todo];
    setTodos(optimisticTodos);
    updateStatistics(optimisticTodos);
    setTodoTitleValue("");
    const previousTodos = [...todos];
    return createNewTodo({ title, isDone: false })
      .then((serverTodo: Todo) => {
        setTodos((prev) =>
          prev.map((item) =>
            (item.id as unknown) === tempId ? serverTodo : item
          )
        );
        updateStatistics([...previousTodos, serverTodo]);
        return serverTodo;
      })
      .catch((error) => {
        console.error("Ошибка при создании задачи:", error);
        setTodos(previousTodos);
        updateStatistics(previousTodos);
        setTodoTitleValue(title);
        alert("Не удалось создать задачу");
        throw error;
      });
  };

  const getTodoByFilter = (filter: TodoInfoFilterEnum) => {
    setTodoFilter(filter);
  };

  const handleDeleteButton = (todo: Todo) => {
    const previosTodos = [...todos];
    const updatedTodos = todos.filter((item) => item.id !== todo.id);
    setTodos(updatedTodos);
    updateStatistics(updatedTodos);
    return deleteTodo(todo.id)
      .then(() => {})
      .catch((error) => {
        console.error("Ошибка при удалении задачи задачи:", error);
        setTodos(previosTodos);
        updateStatistics(previosTodos);
        alert("Не удалось удалить задачу");
        throw error;
      });
  };

  const checkboxCheckedChange = (todo: Todo) => {
    const previosTodos = [...todos];
    const updatedTodos = todos.map((item) =>
      item.id === todo.id ? { ...item, isDone: !item.isDone } : item
    );
    setTodos(updatedTodos);

    return updateTodo(todo.id, { isDone: !todo.isDone })
      .then(() => {
        return getTodos(todoFilter);
      })
      .then((todos) => {
        if (todos && todos.info) {
          setInfo(todos.info);
          setTodos(todos.data)
        }
      })
      .catch((error) => {
        console.error("Ошибка при изменение статуса задачи:", error);
        alert("Не удалось изменить статус задачи");
        setTodos(previosTodos);
        updateStatistics(previosTodos);
        throw error;
      });
  };

  const updateTodosAfterEdit = (todo: Todo, todoTitle: string) => {
    const previosTodos = [...todos];
    const changedTodo: Todo = {
      id: todo.id,
      title: todoTitle,
      created: todo.created,
      isDone: todo.isDone,
    };
    const updatedTodos = todos.map((item) =>
      item.id === todo.id ? changedTodo : item
    );
    setTodos(updatedTodos);
    updateStatistics(updatedTodos);
    return updateTodo(todo.id, { title: todoTitle })
      .then(() => {
        return getTodos(todoFilter);
      })
      .then((todos) => {
        if (todos && todos.info) {
          setInfo(todos.info);
          setTodos(todos.data);
        }
      })
      .catch((error) => {
        console.error("Ошибка при изменение статуса задачи:", error);
        alert("Не удалось изменить статус задачи");
        setTodos(previosTodos);
        updateStatistics(previosTodos);
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
        getTodoByFilter={getTodoByFilter}
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
