import { Button } from "antd";
import { TodoInfoFilterEnum, type TodoInfo } from "../../types/types";
import styles from './FilterButtons.module.css'

interface Props {
  getTodoByFilter: (filter: TodoInfoFilterEnum) => void;
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
    <div className={styles.container}>
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
    </div>
  );
};

export default FilterButtons;
