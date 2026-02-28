import { List } from "antd";
import TodoListItem from "../TodoListItem/TodoListItem";
import styles from './TodoList.module.css'
import type { Todo } from "../../types/todos/types";

interface Props {
  todos: Todo[];
  handleDeleteTodo: (todo: Todo) => void;
  checkboxCheckedChange: (todo: Todo) => void;
  updateTodosAfterEdit: (todo: Todo, todoTitle: string) => void;
}

const TodoList = ({
  updateTodosAfterEdit,
  checkboxCheckedChange,
  handleDeleteTodo,
  todos,
}: Props) => {
  return (
    <>
      <List className={styles.list}>
        {todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            updateTodosAfterEdit={updateTodosAfterEdit}
            checkboxCheckedChange={checkboxCheckedChange}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
      </List>
    </>
  );
};

export default TodoList;
