import React from "react";
import type { SetStateAction } from "react";
import { validateTitle } from "../utils/validation/validateTitle";

interface props {
  todoTitleValue: string;
  setTodoTitleValue: React.Dispatch<SetStateAction<string>>;
  onAddTodo: (title: string) => Promise<void>;
}

const CreateTodo = ({
  todoTitleValue,
  setTodoTitleValue,
  onAddTodo,
}: props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitleValue(e.target.value);
  };

  const createAndValidateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateTitle(todoTitleValue)) {
      alert(
        "Название должно быть больше 2 и меньше 64 символов, а также не должно состоять из пустых пробелов"
      );
      return;
    }
    onAddTodo(todoTitleValue);
  };

  return (
    <form onSubmit={createAndValidateTodo} className="CreateTodo">
      <input
        value={todoTitleValue}
        onChange={handleInputChange}
        placeholder="Task To Be Done..."
        className="CreateTodo__input"
        name="CreateTodoTodo"
      />
      <button type="submit" className="CreateTodo__button">
        Add
      </button>
    </form>
  );
};

export default CreateTodo;
