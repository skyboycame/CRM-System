import { TodoInfoFilterEnum, type MetaResponse, type Todo, type TodoInfo, type TodoRequest } from "../../types/todos/types";
import { api } from "../axiosInstance";

export async function createNewTodo(newTodo: TodoRequest): Promise<Todo> {
  const response = await api.post<Todo>(`todos`, newTodo);
  const result = response.data;
  return result;
}

export async function deleteTodo(id: number): Promise<void> {
  await api.delete<void>(`todos/${id}`);
}

export const getTodos = async (
  filter: TodoInfoFilterEnum = TodoInfoFilterEnum.ALL ,
): Promise<MetaResponse<Todo, TodoInfo>> => {

  const response = await api.get<MetaResponse<Todo, TodoInfo>>("/todos", {
    params : { filter }
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
