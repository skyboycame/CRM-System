import React, { useState } from "react";
import type { Todo } from "../types/types";

interface TodoListItemProps {
  deleteTodo: (id: number) => Promise<void>;
  id: number;
  title: string;
  isDone: boolean;
  created: string;
  changeHadler: (id: number, updatedData: Partial<Todo>) => void;
  valitateTitle: (title: string) => boolean;
}

const TodoListItem = ({
  valitateTitle,
  deleteTodo,
  id,
  title,
  isDone,
  changeHadler,
}: TodoListItemProps) => {
  const [editValue, setEditValue] = useState(title);
  const [isEdit, setIsEdit] = useState(false);

  const editHandler = () => {
    setIsEdit(!isEdit);
  };

  const OkEditHandler = (id: number) => {
    if (!valitateTitle(editValue)) {
      alert("Название должно быть больше 2 и меньше 64 символов");
      return;
    }
    changeHadler(id, { title: editValue });
    setIsEdit(!isEdit);
  };

  const CancelEditHandler = () => {
    setIsEdit(!isEdit);
  };

  const OkEditHandlerEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      OkEditHandler(id);
    }
  };

  const deleteHandler = (id: number) => {
    deleteTodo(id);
  };

  return (
    <li className="todo__list-item" id={id.toString()}>
      <div className="todo__list-item-container">
        {!isEdit ? (
          <>
            <input
              className="todo__input"
              type="checkbox"
              onChange={() => changeHadler(id, { isDone: !isDone })}
              checked={isDone}
            />
            <h3 className="todo__title">{editValue}</h3>
            <button
              onClick={() => editHandler()}
              className="todo__button-edit"
              aria-label="edit"
            >
              edit
            </button>
            <button
              className="todo__button-delete"
              onClick={() => deleteHandler(id)}
              aria-label="delete"
            >
              delete
            </button>
          </>
        ) : (
          <>
            <input
              onKeyDown={(e: React.KeyboardEvent) => OkEditHandlerEnter(e)}
              placeholder="Edit Your Todo Name..."
              onChange={(e) => setEditValue(e.target.value)}
              type="text"
              className="todo__title"
              value={editValue}
            />
            <button onClick={() => OkEditHandler(id)}>OK</button>
            <button onClick={() => CancelEditHandler()}>Отмена</button>
          </>
        )}
        <div className="todo__buttons"></div>
      </div>
    </li>
  );
};

export default TodoListItem;
