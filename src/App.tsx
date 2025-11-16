import CreateTodo from "./components/layout/CreateTodo";
import { useEffect, useState } from "react";
import type { Todo, MetaResponse, TodoInfo, TodoRequest } from "./types/types";
import TodoList from "./components/TodoList";

export type Filter = "all" | "inWork" | "completed";

export const BASE_URL = "https://easydev.club/api/v1";


function App() {
  const [data, setData] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>({
  all: 0,
  completed: 0,
  inWork: 0
});
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
   const [filter, setFilter] = useState<Filter>("all");

  async function createNewTodo(newTodo: TodoRequest): Promise<void> {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Ошибка ${response.status}: ${message}`);
    }

    const result = await response.json();
    setData((data) => [result, ...data]);
  }

  async function deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Ошибка ${response.status}: ${message}`);
    }

    setData((data) => data.filter((todo) => todo.id !== id));
  }

  const valitateTitle = (title: string) => {
    if (title.length < 2) return false;
    else if (title.length > 64) return false;
    else if (!title.trim()) return false;
    else return true;
  };

  const fetchFilter = (status: Filter) => {
    fetch(`${BASE_URL}/todos?filter=${status}`)
          .then((response) => response.json())
          .then((dataAPI: MetaResponse<Todo, TodoInfo>) => {
            setData(dataAPI.data);
            if (dataAPI.info) {
            setInfo(dataAPI.info);
            }
          })
          .catch((e) => console.error(e))
  }

   const changeHadler = async (id: number, updatedData: Partial<Todo>) => {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Ошибка ${response.status}: ${message}`);
    }

    const result: Todo = await response.json();
    console.log(result);
    setData((data) => data.map((todo) => (todo.id === id ? result : todo)));
     fetchFilter(filter)
  };

  useEffect(() => {
    fetch(`${BASE_URL}/todos`)
      .then((response) => response.json())
      .then((dataAPI: MetaResponse<Todo, TodoInfo>) => {
        setData(dataAPI.data);
         if (dataAPI.info) {
        setInfo(dataAPI.info);
        }
        console.log("Fetched todos:", data);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      {!isLoading ? (
        <>
          <CreateTodo
            valitateTitle={valitateTitle}
            inputValue={inputValue}
            setInputValue={setInputValue}
            createNewTodo={createNewTodo}
            todos={data}
           
          ></CreateTodo>
          <TodoList
            fetchFilter={fetchFilter}
            valitateTitle={valitateTitle}
            changeHadler={changeHadler}
            deleteTodo={deleteTodo}
            todos={data}
            info={info}
            setFilter={setFilter}
            filter={filter}
          ></TodoList>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}

export default App;
