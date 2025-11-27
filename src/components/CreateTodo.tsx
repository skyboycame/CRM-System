import React from "react";
import { todoInfoFilterEnum, type Todo, type TodoInfo} from "../types/types";
import type { SetStateAction } from "react";
import { createNewTodo, getTodos } from "../api";
import { validateTitle } from "../utils/validation/validateTitle";



interface props {
  setInfo: React.Dispatch<React.SetStateAction<TodoInfo>>;
  todoFilter: todoInfoFilterEnum;
  todoTitleValue: string;
  setTodoTitleValue: React.Dispatch<SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const CreateTodo = ({
  setInfo,
  todoFilter,
  setTodos,
  todoTitleValue,
  setTodoTitleValue,
}: props) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitleValue(e.target.value);
  };

  const createAndValidateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateTitle(todoTitleValue)) {
      alert("Название должно быть больше 2 и меньше 64 символов, а также не должно состоять из пустых пробелов");
      return;
    }
    createNewTodo({ title: todoTitleValue, isDone: false })
    .then(newTodo => {
      setTodos((todos) => [...todos, newTodo])
      return getTodos(todoFilter)
    })
    .then(todos => {
      if (todos && todos.info) {
            setInfo(todos.info);
          }
           setTodoTitleValue("");

    })};
  

  return (
      <form onSubmit={createAndValidateTodo} className="CreateTodo">
        <input
          value={todoTitleValue}
          onChange={handleInputChange}
          placeholder="Task To Be Done..."
          className="CreateTodo__input"
          type="CreateTodo"
          name="CreateTodoTodo"
        />
        <button type="submit" className="CreateTodo__button">
          Add
        </button>
      </form>
  );
};

export default CreateTodo;
