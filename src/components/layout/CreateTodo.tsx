import React from "react";
import type { Todo, TodoRequest } from "../../types/types";
import type { SetStateAction } from "react";


interface TodoProps {
  todos: Todo[];
  createNewTodo: (newTodo: TodoRequest) => Promise<void>;
  inputValue: string;
  setInputValue: React.Dispatch<SetStateAction<string>>;
  valitateTitle: (title: string) => boolean;
  
}

const CreateTodo = ({
  valitateTitle,
  createNewTodo,
  inputValue,
  setInputValue,
}: TodoProps) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const buttonHandler = () => {
    if (!valitateTitle(inputValue)) {
      alert("Название должно быть больше 2 и меньше 64 символов");
      return;
    }
    createNewTodo({ title: inputValue, isDone: false });
    setInputValue("");
  };

  return (
    <>
      <div className="CreateTodo">
        <input
          value={inputValue}
          onChange={(e) => inputHandler(e)}
          placeholder="Task To Be Done..."
          className="CreateTodo__input"
          type="CreateTodo"
          name="CreateTodoTodo"
        />
        <button onClick={buttonHandler} className="CreateTodo__button">
          Add
        </button>
      </div>
    </>
  );
};

export default CreateTodo;
