import { useState, useEffect } from "react";
import type { Todo, TodoInfo } from "../../types/types";
import TodoList from "../TodoList";
import CreateTodo from "./CreateTodo";
import type { Filter } from "../../types/types";
import { fetchData } from "../../api";

export const BASE_URL = "https://easydev.club/api/v1";

const Page = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    fetchData(setData, setInfo, setIsLoading);
  }, []);

  return (
    <div className="container">
      {!isLoading ? (
        <>
          <CreateTodo
            inputValue={inputValue}
            setInputValue={setInputValue}
            setData={setData}
            todos={data}
          ></CreateTodo>
          <TodoList
            todos={data}
            info={info}
            setData={setData}
            setInfo={setInfo}
            setFilter={setFilter}
            filter={filter}
            setIsLoading={setIsLoading}
          ></TodoList>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default Page;
