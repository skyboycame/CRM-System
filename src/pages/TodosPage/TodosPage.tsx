import { useState, useEffect, useCallback } from "react";
import type { Todo, TodoInfo } from "../../types/types";
import TodoList from "../../components/TodoList/TodoList";
import CreateTodo from "../../components/CreateTodo/CreateTodo";
import { TodoInfoFilterEnum } from "../../types/types";
import FilterButtons from "../../components/FilterButtons/FilterButtons";
import { notifyError } from "../../utils/notify/notify";
import { createNewTodo, deleteTodo, getTodos, updateTodo } from "../../api/todos/request";

const TodosPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [todoFilter, setTodoFilter] = useState<TodoInfoFilterEnum>(
    TodoInfoFilterEnum.ALL,
  );

  const loadTodos = useCallback(() => {
    return getTodos(todoFilter)
      .then((todos) => {
        if (todos && todos.info) {
          setTodos(todos.data);
          setInfo(todos.info);
        }
      })
      .catch((e) => {
        notifyError("Загрузка todo", e);
      });
  }, [todoFilter]);

  const handleAddTodo = (title: string) => {
    return createNewTodo({ title, isDone: false })
      .then(() => loadTodos())
      .catch((e) => {
        notifyError("Добавление todo", e);
      });
  };

  const getTodoByFilter = (filter: TodoInfoFilterEnum) => {
    setTodoFilter(filter);
  };

  const handleDeleteTodo = (todo: Todo) => {
    return deleteTodo(todo.id)
      .then(() => loadTodos())
      .catch((e) => {
        notifyError("Удаление todo", e);
      });
  };

  const checkboxCheckedChange = (todo: Todo) => {
    return updateTodo(todo.id, { isDone: !todo.isDone })
      .then(() => loadTodos())
      .catch((e) => {
        notifyError("Обновление todo", e);
      });
  };

  const updateTodosAfterEdit = (todo: Todo, todoTitle: string) => {
    return updateTodo(todo.id, { title: todoTitle })
      .then(() => loadTodos())
      .catch((e) => {
        notifyError("Обновление todo", e);
      });
  };

  useEffect(() => {
    loadTodos();

    const intervalId = setInterval(() => {
      loadTodos();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [loadTodos]);

  return (
    <div className="container">
      <CreateTodo onAddTodo={handleAddTodo}></CreateTodo>
      <FilterButtons
        getTodoByFilter={getTodoByFilter}
        info={info}
        todoFilter={todoFilter}
      ></FilterButtons>
      <TodoList
        updateTodosAfterEdit={updateTodosAfterEdit}
        checkboxCheckedChange={checkboxCheckedChange}
        handleDeleteTodo={handleDeleteTodo}
        todos={todos}
      ></TodoList>
    </div>
  );
};

export default TodosPage;
