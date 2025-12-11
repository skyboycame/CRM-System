import { todoInfoFilterEnum, type TodoInfo } from "../types/types";

interface Props {
  getTodoByFilter: (filter: todoInfoFilterEnum) => void;
  todoFilter: todoInfoFilterEnum;
  info: TodoInfo;
}

const FilterButtons = ({ todoFilter, info, getTodoByFilter }: Props) => {
  const getButtonClass = (filterType: todoInfoFilterEnum) => {
    return `todo__filter-btn ${
      todoFilter === filterType ? "todo__filter-btn--active" : ""
    }`;
  };

  return (
    <div className="todo__buttons-container">
      <button
        className={getButtonClass(todoInfoFilterEnum.all)}
        onClick={() => getTodoByFilter(todoInfoFilterEnum.all)}
      >
        All {`(${info.all})`}
      </button>
      <button
        className={getButtonClass(todoInfoFilterEnum.inWork)}
        onClick={() => getTodoByFilter(todoInfoFilterEnum.inWork)}
      >
        inWork {`(${info.inWork})`}
      </button>
      <button
        className={getButtonClass(todoInfoFilterEnum.completed)}
        onClick={() => getTodoByFilter(todoInfoFilterEnum.completed)}
      >
        Completed {`(${info.completed})`}
      </button>
    </div>
  );
};

export default FilterButtons;
