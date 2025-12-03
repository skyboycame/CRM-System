import { type Todo } from "../types/types";
import TodoListItem from "./TodoListItem";

interface props {
  todos: Todo[];
  handleDeleteButton: (todo: Todo) => void;
  checkboxCheckedChange: (todo: Todo) => void;
  updateTodosAfterEdit: (todo: Todo, todoTitle: string) => void;
}

const TodoList = ({
  updateTodosAfterEdit,
  checkboxCheckedChange,
  handleDeleteButton,
  todos,
}: props) => {
  return (
    <>
      <ul className="todo__list">
        {todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            updateTodosAfterEdit={updateTodosAfterEdit}
            checkboxCheckedChange={checkboxCheckedChange}
            handleDeleteButton={handleDeleteButton}
          ></TodoListItem>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
