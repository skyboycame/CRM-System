import React from "react";
import type { Todo} from "../types/types";
import type { SetStateAction } from "react";
import { createNewTodo } from "../api";
import { validateTitle } from "../utils/validation/validateTitle";


interface props {
  todoTitleValue: string;
  setTodoTitleValue: React.Dispatch<SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const CreateTodo = ({
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
      alert("Название должно быть больше 2 и меньше 64 символов");
      return;
    }
    createNewTodo({ title: todoTitleValue, isDone: false })
    .then(newTodo => setTodos((todos) => [...todos, newTodo]));
    setTodoTitleValue("");
  };


  

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
