import React from "react";
import type { Todo} from "../../types/types";
import type { SetStateAction } from "react";
import { createNewTodo } from "../../api";
import { validateTitle } from "../../utils/validation/validateTitle";


interface TodoProps {
  todos: Todo[];
  inputValue: string;
  setInputValue: React.Dispatch<SetStateAction<string>>;
  setData: React.Dispatch<React.SetStateAction<Todo[]>>
}

const CreateTodo = ({
  setData,
  inputValue,
  setInputValue,
}: TodoProps) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const buttonHandler = () => {
    if (!validateTitle(inputValue)) {
      alert("Название должно быть больше 2 и меньше 64 символов");
      return;
    }
    createNewTodo({ title: inputValue, isDone: false }, setData);
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
