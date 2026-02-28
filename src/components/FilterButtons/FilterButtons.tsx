import { Button, Flex } from "antd";
import styles from './FilterButtons.module.css'
import { TodoInfoFilterEnum, type TodoInfo,  } from "../../types/todos/types";

interface Props {
  getTodoByFilter: (filter: TodoInfoFilterEnum ) => void;
  todoFilter: TodoInfoFilterEnum;
  info: TodoInfo;
}

const FilterButtons = ({ todoFilter, info, getTodoByFilter }: Props) => {
  const getButtonClass = (filterType: TodoInfoFilterEnum) => {
    return `todo__filter-btn ${
      todoFilter === filterType ? styles.buttonActive : ""
    }`;
  };

  return (
    <Flex gap="1rem" style={{ marginBottom: '1rem', marginTop: '1rem' }}>
      <Button
        className={getButtonClass(TodoInfoFilterEnum.ALL)}
        onClick={() => getTodoByFilter(TodoInfoFilterEnum.ALL)}
      >
        All {`(${info.all})`}
      </Button>
      <Button
        className={getButtonClass(TodoInfoFilterEnum.IN_WORK)}
        onClick={() => getTodoByFilter(TodoInfoFilterEnum.IN_WORK)}
      >
        inWork {`(${info.inWork})`}
      </Button>
      <Button
        className={getButtonClass(TodoInfoFilterEnum.COMPLETED)}
        onClick={() => getTodoByFilter(TodoInfoFilterEnum.COMPLETED)}
      >
        Completed {`(${info.completed})`}
      </Button>
    </Flex>
  );
};

export default FilterButtons;
