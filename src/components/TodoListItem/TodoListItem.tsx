import { useState } from "react";
import { validateTitle } from "../../utils/validation/validateTitle";
import { Button, Checkbox, Input, List } from "antd";
import type { Todo } from "../../types/todos/types";

interface Props {
  todo: Todo;
  handleDeleteTodo: (todo: Todo) => void;
  checkboxCheckedChange: (todo: Todo) => void;
  updateTodosAfterEdit: (todo: Todo, todoTitle: string) => void;
}

const TodoListItem = 
  ({
    updateTodosAfterEdit,
    todo,
    checkboxCheckedChange,
    handleDeleteTodo,
  }: Props) => {
    const [editValue, setEditValue] = useState<string>(todo.title);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const handleEditButton = () => {
      setIsEdit(!isEdit);
    };

    const handleOkEditButton = () => {
      if (!validateTitle(editValue)) {
        return;
      }
      updateTodosAfterEdit(todo, editValue);
      setIsEdit(!isEdit);
    };

    const handleCancelButton = () => {
      setIsEdit(!isEdit);
      setEditValue(todo.title);
    };

    const actions = isEdit
      ? [
          <Button onClick={handleOkEditButton}>Ok</Button>,
          <Button onClick={handleCancelButton}>Cancel</Button>,
        ]
      : [
          <Button onClick={handleEditButton}>Edit</Button>,
          <Button danger onClick={() => handleDeleteTodo(todo)}>
            Delete
          </Button>,
        ];

    return (
      <List.Item actions={actions}>
        <List.Item.Meta
          avatar={
            <Checkbox
              checked={todo.isDone}
              onChange={() => checkboxCheckedChange(todo)}
              disabled={isEdit}
            />
          }
          title={
            isEdit ? (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              todo.title
            )
          }
        />
      </List.Item>
    );
  }


export default TodoListItem;
