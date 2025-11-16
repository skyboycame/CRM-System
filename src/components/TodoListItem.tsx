import React, { useState } from "react";
import type { Todo, TodoInfo } from "../types/types";
import { deleteTodo, changeHadler } from "../api";
import type { Filter } from "../types/types";
import { validateTitle } from "../utils/validation/validateTitle";

interface TodoListItemProps {
  title: string;
  isDone: boolean;
  created: string;
  id: number
  setData: React.Dispatch<React.SetStateAction<Todo[]>>,
  setInfo: React.Dispatch<React.SetStateAction<TodoInfo>>
  filter: Filter
}

const TodoListItem = ({
  setData,
  id,
  title,
  isDone,
  setInfo,
  filter
  
}: TodoListItemProps) => {
  const [editValue, setEditValue] = useState(title);
  const [isEdit, setIsEdit] = useState(false);

  const handleEditButton = () => {
    setIsEdit(!isEdit);
  };

  const handleOkEditButton = (id: number) => {
    if (!validateTitle(editValue)) {
      alert("Название должно быть больше 2 и меньше 64 символов");
      return;
    }
    
    changeHadler(id, { title: editValue },filter,setData, setInfo);
    setIsEdit(!isEdit);
  };

  const handleCancelButton = () => {
    setIsEdit(!isEdit);
    setEditValue(title)
  };

  const handleOkEditButtonEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleOkEditButton(id);
    }
  };

  const handleDeleteButton = (id: number) => {
    deleteTodo(id, setData);
  };

  return (
    <li className="todo__list-item" id={id.toString()}>
      <div className="todo__list-item-container">
        {!isEdit ? (
          <>
            <input
              className="todo__input"
              type="checkbox"
              onChange={() => changeHadler(id, { isDone: !isDone },filter,setData, setInfo)}
              checked={isDone}
            />
            <h3 className="todo__title">{editValue}</h3>
            <button
              onClick={() => handleEditButton()}
              className="todo__button-edit"
              aria-label="edit"
            >
              edit
            </button>
            <button
              className="todo__button-delete"
              onClick={() => handleDeleteButton(id)}
              aria-label="delete"
            >
              delete
            </button>
          </>
        ) : (
          <>
            <input
              onKeyDown={(e: React.KeyboardEvent) => handleOkEditButtonEnter(e)}
              placeholder="Edit Your Todo Name..."
              onChange={(e) => setEditValue(e.target.value)}
              type="text"
              className="todo__title"
              value={editValue}
            />
            <button onClick={() => handleOkEditButton(id)}>OK</button>
            <button onClick={() => handleCancelButton()}>Отмена</button>
          </>
        )}
        <div className="todo__buttons"></div>
      </div>
    </li>
  );
};

export default TodoListItem;
