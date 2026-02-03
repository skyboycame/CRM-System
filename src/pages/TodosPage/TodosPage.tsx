import { useState, useEffect, useCallback } from "react";
import type { Todo, TodoInfo } from "../../types/types";
import TodoList from "../../components/TodoList/TodoList";
import CreateTodo from "../../components/CreateTodo/CreateTodo";
import { TodoInfoFilterEnum } from "../../types/types";
import { createNewTodo, deleteTodo, getTodos, updateTodo } from "../../api";
import FilterButtons from "../../components/FilterButtons/FilterButtons";
import { notifyError } from "../../utils/notify/notify";


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

  const updateStatistics = (todosList: Todo[]) => {
    const all = todosList.length;
    const completed = todosList.filter((todo) => todo.isDone).length;
    const inWork = all - completed;
    setInfo({ all, completed, inWork });
  };

const handleAddTodo = useCallback((title: string) => {

  return createNewTodo({ title, isDone: false })
    .then(() => getTodos(todoFilter))
    .then((todos) => {
      if (todos && todos.info) {
        setTodos(todos.data);
        setInfo(todos.info);
      }
    })
    .catch((e) => {
      notifyError('Добавление todo', e)
    });
}, [todoFilter]);

  const getTodoByFilter = (filter: TodoInfoFilterEnum) => {
    setTodoFilter(filter);
  };

const handleDeleteButton = useCallback((todo: Todo) => {
  return deleteTodo(todo.id)
    .then(() => getTodos(todoFilter))
    .then((todos) => {
      if (todos && todos.info) {
        setTodos(todos.data);
        setInfo(todos.info);
      }
    })
    .catch((e) => {
      notifyError('Удаление todo', e)
    });
}, [todoFilter]);

  const checkboxCheckedChange = useCallback((todo: Todo) => {
  const previosTodos = [...todos];

  const updatedTodos = todos.map((item) =>
    item.id === todo.id ? { ...item, isDone: !item.isDone } : item,
  );

  setTodos(updatedTodos);

  return updateTodo(todo.id, { isDone: !todo.isDone })
    .then(() => getTodos(todoFilter))
    .then((todos) => {
      if (todos && todos.info) {
        setInfo(todos.info);
        setTodos(todos.data);
      }
    })
    .catch((e) => {
      notifyError('Обновление todo', e)
      setTodos(previosTodos);
      updateStatistics(previosTodos);
    });
}, [todos, todoFilter]);

  const updateTodosAfterEdit = useCallback((todo: Todo, todoTitle: string) => {
  const previosTodos = [...todos];

  const changedTodo: Todo = {
    id: todo.id,
    title: todoTitle,
    created: todo.created,
    isDone: todo.isDone,
  };

  const updatedTodos = todos.map((item) =>
    item.id === todo.id ? changedTodo : item,
  );

  setTodos(updatedTodos);

  return updateTodo(todo.id, { title: todoTitle })
    .then(() => getTodos(todoFilter))
    .then((todos) => {
      if (todos && todos.info) {
        setInfo(todos.info);
        setTodos(todos.data);
      }
    })
    .catch((e) => {
      notifyError('Обновление статуса todo', e)
      setTodos(previosTodos);
      updateStatistics(previosTodos);
    });
}, [todos, todoFilter]);

  const getFilteredTodos = useCallback(() => {
    getTodos(todoFilter).then((todos) => {
      if (todos && todos.info) {
        setTodos(todos.data);
        setInfo(todos.info);
      }
    });
  },[todoFilter]);

  useEffect(() => {
    getFilteredTodos();
    const intervalId = setInterval(() => {
      getFilteredTodos();
    }, 5000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoFilter]);

  return (
    <div className="container">
      <CreateTodo
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
