import type { TodoRequest, Todo, TodoInfo } from "../types/types";
import { TodoInfoFilterEnum, type MetaResponse } from "../types/types";
import { api } from "./axiosInstance";
import type { GetParams } from "./types";

export async function createNewTodo(newTodo: TodoRequest): Promise<Todo> {
  const response = await api.post<Todo>(`todos`, newTodo);
  const result = response.data;
  return result;
}

export async function deleteTodo(id: number): Promise<void> {
  await api.delete<void>(`todos/${id}`);
}

export const getTodos = async (
  filter?: TodoInfoFilterEnum,
): Promise<MetaResponse<Todo, TodoInfo>> => {
  const params: GetParams | undefined = filter ? { filter } : undefined;

  const response = await api.get<MetaResponse<Todo, TodoInfo>>("/todos", {
    params,
  });
  const result = response.data;
  return result;
};

export async function updateTodo(
  id: number,
  updatedTodo: TodoRequest,
): Promise<Todo> {
  const response = await api.put<Todo>(`/todos/${id}`, updatedTodo);
  const result = response.data;
  return result;
}
