import React, { useState } from "react";
import type { Todo, TodoInfo } from "../types/types";
import { deleteTodo, updateTodo, getTodos } from "../api";
import { todoInfoFilterEnum } from "../types/types";
import { validateTitle } from "../utils/validation/validateTitle";

interface props {
  title: string;
  isDone: boolean;
  id: number;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setInfo: React.Dispatch<React.SetStateAction<TodoInfo>>;
  todoFilter: todoInfoFilterEnum;
}

const TodoListItem = ({
  setTodos,
  id,
  title,
  isDone,
  setInfo,
  todoFilter,
}: props) => {
  const [editValue, setEditValue] = useState<string>(title);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEditButton = () => {
    setIsEdit(!isEdit);
  };

  const handleOkEditButton = () => {
    if (!validateTitle(editValue)) {
      alert("Название должно быть больше 2 и меньше 64 символов");
      return;
    }

    updateTodo(id, { title: editValue })
      .then((result) => {
        setTodos((data) =>
          data.map((todo) => (todo.id === id ? result : todo))
        );
        return getTodos(todoFilter);
      })
      .then((todos) => {
        if (todos && todos.info) {
          setTodos(todos.data);
          setInfo(todos.info);
        }
      });
    setIsEdit(!isEdit);
  };

  const checkboxCheckedChange = () => {
    updateTodo(id, { isDone: !isDone })
      .then((result) => {
        setTodos((data) =>
          data.map((todo) => (todo.id === id ? result : todo))
        );
        return getTodos(todoFilter);
      })
      .then((todos) => {
        if (todos && todos.info) {
          setInfo(todos.info)
          setTodos(todos.data);
        }
      });
  };

  const handleCancelButton = () => {
    setIsEdit(!isEdit);
    setEditValue(title);
  };

  const handleDeleteButton = () => {
    deleteTodo(id)
      .then(() => {
        setTodos((data) => data.filter((todo) => todo.id !== id));
        return getTodos(todoFilter);
      })
      .then((todos) => {
        if (todos && todos.info) {
          setTodos(todos.data);
          setInfo(todos.info);
        }
      });
  };

  return (
    <li className="todo__list-item" id={id.toString()}>
      <div className="todo__list-item-container">
        {!isEdit ? (
          <>
            <input
              className="todo__input-checkbox"
              type="checkbox"
              onChange={checkboxCheckedChange}
              checked={isDone}
            />
            <h3 className="todo__title">{editValue}</h3>
            <button
              onClick={handleEditButton}
              className="button__input todo__button-edit"
              aria-label="edit"
            >
              <svg
                className="button__edit-svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="button__input todo__button-delete"
              onClick={handleDeleteButton}
              aria-label="delete"
            >
              <svg
                className="button__delete-svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6H5H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 11V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 11V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        ) : (
          <>
            <input
              className="todo__input-checkbox"
              type="checkbox"
              onChange={checkboxCheckedChange}
              checked={isDone}
              disabled
            />
            <input
              placeholder="Edit Your Todo Name..."
              onChange={(e) => setEditValue(e.target.value)}
              type="text"
              className="todo__title"
              value={editValue}
            />
            <button className="button__input" onClick={handleOkEditButton}>
              Ok
            </button>
            <button className="button__input" onClick={handleCancelButton}>
              Cancel
            </button>
          </>
        )}
        <div className="todo__buttons"></div>
      </div>
    </li>
  );
};

export default TodoListItem;
