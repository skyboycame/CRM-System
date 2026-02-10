import { useState } from "react";
// import { validateTitle } from "../../utils/validation/validateTitle";
import styles from "./CreateTodo.module.css";
import { Button, Flex, Form, Input } from "antd";
import { notifyError } from "../../utils/notify/notify";
import { TODO_TITLE_MAX_LENGTH, TODO_TITLE_MIN_LENGTH } from "../../utils/validation/validateTitle";

interface Props {
  onAddTodo: (title: string) => Promise<void>;
}

const CreateTodo = ({ onAddTodo }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleFinishForm = async (values: { title: string }) => {
    setIsLoading(true);

    try {
      await onAddTodo(values.title);
      form.resetFields();
    } catch (e) {
      notifyError("Не удалось создать todo", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleFinishForm} className="createTodo">
      <Flex align="center">
        <Form.Item
          name="title"
          rules={[
            { required: true, message: "Введите название задачи" },
            { min: TODO_TITLE_MIN_LENGTH, message: "Название должно быть не менее 2 символов" },
            { max: TODO_TITLE_MAX_LENGTH, message: "Название должно быть не более 64 символов" },
          ]}
        >
          <Input placeholder="Task To Be Done..." />
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
      </Flex>
    </Form>
  );
};

export default CreateTodo;
