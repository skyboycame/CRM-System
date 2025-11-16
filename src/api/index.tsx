import type { TodoRequest, Todo, TodoInfo } from "../types/types";
import type { Filter } from "../types/types";

export const BASE_URL = "https://easydev.club/api/v1";

export async function createNewTodo(
  newTodo: TodoRequest,
  setData: React.Dispatch<React.SetStateAction<Todo[]>>
): Promise<void> {
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

export async function deleteTodo(
  id: number,
  setData: React.Dispatch<React.SetStateAction<Todo[]>>
): Promise<void> {
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


// export const fetchFilter = async (
//   status: Filter,
//   setData: React.Dispatch<React.SetStateAction<Todo[]>>,
//   setInfo: React.Dispatch<React.SetStateAction<TodoInfo>>
// ) => {
//   fetch(`${BASE_URL}/todos?filter=${status}`)
//     .then((response) => response.json())
//     .then((dataAPI: MetaResponse<Todo, TodoInfo>) => {
//       setData(dataAPI.data);
//       if (dataAPI.info) {
//         setInfo(dataAPI.info);
//       }
//     })
//     .catch((e) => console.error(e));
// };

export const fetchData = async (
  setData: React.Dispatch<React.SetStateAction<Todo[]>>,
  setInfo: React.Dispatch<React.SetStateAction<TodoInfo>>,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  status?: Filter,
) => {
  try {
    let response: Response
      if (status) {
        response = await fetch(`${BASE_URL}/todos?filter=${status}`);
      } else {
        response = await fetch(`${BASE_URL}/todos`);
      }
      if (!response.ok) {
      const message = await response.text();
      throw new Error(`Ошибка ${response.status}: ${message}`);
    }
    const result = await response.json();
    setData(result.data)
    if (result.info) {
         setInfo(result.info);
      }
  } catch (error) {
    console.error(error)
  }
  finally {
    if(setIsLoading)setIsLoading(false)
  }
};

// export const fetchData = (
//   setData: React.Dispatch<React.SetStateAction<Todo[]>>,
//   setInfo: React.Dispatch<React.SetStateAction<TodoInfo>>,
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
// ) => {
//   fetch(`${BASE_URL}/todos`)
//     .then((response) => response.json())
//     .then((dataAPI: MetaResponse<Todo, TodoInfo>) => {
//       setData(dataAPI.data);
//       if (dataAPI.info) {
//         setInfo(dataAPI.info);
//       }
//     })
//     .catch((e) => console.error(e))
//     .finally(() => setIsLoading(false));
// };


export const changeHadler = async (
  id: number,
  updatedData: Partial<Todo>,
  filter: Filter,
  setData: React.Dispatch<React.SetStateAction<Todo[]>>,
  setInfo: React.Dispatch<React.SetStateAction<TodoInfo>>,
) => {
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
  setData((data) => data.map((todo) => (todo.id === id ? result : todo)));
  fetchData(setData, setInfo ,undefined, filter);
};

