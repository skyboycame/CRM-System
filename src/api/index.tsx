import axios from "axios";
import type { TodoRequest, Todo, TodoInfo } from "../types/types";
import { TodoInfoFilterEnum, type MetaResponse } from "../types/types";

export const BASE_URL = "https://easydev.club/api/v1";

export async function createNewTodo(newTodo: TodoRequest): Promise<Todo> {
  const response = await axios.post<Todo>(`${BASE_URL}/todos`, newTodo);
  const result = response.data;
  return result;
}

export async function deleteTodo(id: number): Promise<void> {
  await axios.delete<void>(`${BASE_URL}/todos/${id}`);
}

export const getTodos = async (
  status?: TodoInfoFilterEnum,
): Promise<MetaResponse<Todo, TodoInfo>> => {
  let additionalUrl = "";
  if (status) {
    additionalUrl = `${BASE_URL}/todos?filter=${status}`;
  } else {
    additionalUrl = `${BASE_URL}/todos`;
  }

  const response = await axios.get<MetaResponse<Todo, TodoInfo>>(additionalUrl);
  const result = response.data;
  return result;
};

export async function updateTodo(
  id: number,
  updatedTodo: TodoRequest,
): Promise<Todo> {
  const response = await axios.put<Todo>(
    `${BASE_URL}/todos/${id}`,
    updatedTodo,
  );
  const result = response.data;
  return result;
}
