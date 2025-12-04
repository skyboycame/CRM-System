import { todoInfoFilterEnum, type TodoInfo } from "../types/types";

interface props {
  GetTodoByFilter: (filter: todoInfoFilterEnum) => void;
  todoFilter: todoInfoFilterEnum;
  info: TodoInfo;
}

const FilterButtons = ({ todoFilter, info, GetTodoByFilter }: props) => {
  const getButtonClass = (filterType: todoInfoFilterEnum) => {
    return `todo__filter-btn ${
      todoFilter === filterType ? "todo__filter-btn--active" : ""
    }`;
  };

  return (
    <div className="todo__buttons-container">
      <button
        className={getButtonClass(todoInfoFilterEnum.all)}
        onClick={() => GetTodoByFilter(todoInfoFilterEnum.all)}
      >
        All {`(${info.all})`}
      </button>
      <button
        className={getButtonClass(todoInfoFilterEnum.inWork)}
        onClick={() => GetTodoByFilter(todoInfoFilterEnum.inWork)}
      >
        inWork {`(${info.inWork})`}
      </button>
      <button
        className={getButtonClass(todoInfoFilterEnum.completed)}
        onClick={() => GetTodoByFilter(todoInfoFilterEnum.completed)}
      >
        Completed {`(${info.completed})`}
      </button>
    </div>
  );
};

export default FilterButtons;
