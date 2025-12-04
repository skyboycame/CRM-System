import type { TodoRequest, Todo, TodoInfo } from "../types/types";
import { todoInfoFilterEnum, type MetaResponse } from "../types/types";

export const BASE_URL = "https://easydev.club/api/v1";

export async function createNewTodo(
  newTodo: TodoRequest,
): Promise<Todo> {
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
  return result
}

export async function deleteTodo(
  id: number,
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

  
}

export const getTodos = async (
  status?: todoInfoFilterEnum,
): Promise<MetaResponse<Todo, TodoInfo> | undefined> => {
  try {
    let additionalUrl  = ''
      if (status) {
        additionalUrl  = `${BASE_URL}/todos?filter=${status}`;
      } else {
        additionalUrl  = `${BASE_URL}/todos`;
      }

      const response = await fetch(additionalUrl )
      if (!response.ok) {
      const message = await response.text();
      throw new Error(`Ошибка ${response.status}: ${message}`);
    }
    const result = await response.json()
    return result
  } catch (error) {
    console.error(error)
  }
};


export const updateTodo = async (
  id: number,
  updatedData: TodoRequest,
):Promise<Todo> => {
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
  console.log(result)
  return result

  
};

