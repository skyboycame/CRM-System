import React, { useState } from "react";
import type { SetStateAction } from "react";
// import { validateTitle } from "../../utils/validation/validateTitle";
import styles from "./CreateTodo.module.css";
import { Button, Form, Input } from "antd";
import { notifyError } from "../../utils/notify/notify";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitleValue(e.target.value);
  };

  const createAndValidateTodo = async (values: {title: string}) => {
    setIsLoading(true);

    try {
      await onAddTodo(values.title);
    } 
    catch(e) {
      notifyError('Не удалось создать todo', e)
    }
     finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onFinish={createAndValidateTodo} className="createTodo">
      <div className={styles.formRow}>
        <Form.Item
        name='title'
        rules={[
          {required: true, message: 'Введите название задачи'},
          {min: 2, message: 'Название должно быть не менее 2 символов'},
          {max: 64, message: 'Название должно быть не более 64 символов'},

          
        ]}>
          <Input
            value={todoTitleValue}
            onChange={handleInputChange}
            placeholder="Task To Be Done..."
            className={styles.input}
            name="CreateTodoTodo"
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? "..." : "Add"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default CreateTodo;
