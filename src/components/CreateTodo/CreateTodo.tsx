import { useState } from "react";
// import { validateTitle } from "../../utils/validation/validateTitle";
import styles from "./CreateTodo.module.css";
import { Button, Form, Input } from "antd";
import { notifyError } from "../../utils/notify/notify";

interface Props {
  onAddTodo: (title: string) => Promise<void>;
}

const CreateTodo = ({
  onAddTodo,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm()

  const createAndValidateTodo = async (values: {title: string}) => {
    setIsLoading(true);
    
    try {
      await onAddTodo(values.title);
      form.resetFields()
    } 
    catch(e) {
      notifyError('Не удалось создать todo', e)
    }
     finally {
      setIsLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={createAndValidateTodo} className="createTodo">
      <div className={styles.formRow}>
        <Form.Item
        name='title'
        rules={[
          {required: true, message: 'Введите название задачи'},
          {min: 2, message: 'Название должно быть не менее 2 символов'},
          {max: 64, message: 'Название должно быть не более 64 символов'},

          
        ]}>
           <Input
            placeholder="Task To Be Done..."
            className={styles.input}
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
