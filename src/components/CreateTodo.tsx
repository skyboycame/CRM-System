import React, { useState } from "react";
import type { SetStateAction } from "react";
import { validateTitle } from "../utils/validation/validateTitle";
import { notification } from "antd";

interface Props {
  todoTitleValue: string;
  setTodoTitleValue: React.Dispatch<SetStateAction<string>>;
  onAddTodo: (title: string) => Promise<void>;
}

const CreateTodo = ({
  todoTitleValue,
  setTodoTitleValue,
  onAddTodo,
}: Props) => {
   const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitleValue(e.target.value);
  };

  const createAndValidateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateTitle(todoTitleValue)) {
      notification.error({
        message: "Ошибка валидации",
        description: "Название должно быть больше 2 и меньше 64 символов, а также не должно состоять из пустых пробелов",
        placement: "topRight",
        duration: 4.5
      });
      return;
    }
    setIsLoading(true);
    
    try {
      await onAddTodo(todoTitleValue);
    } catch {
      alert("Не удалось создать задачу");
    } finally {
      setIsLoading(false);
    }
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
      <button 
        type="submit" 
        className="CreateTodo__button"
        disabled={isLoading}
      >
        {isLoading ? "..." : "Add"}
      </button>
    </form>
  );
};

export default CreateTodo;
