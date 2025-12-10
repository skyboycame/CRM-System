import type { TodoRequest, Todo, TodoInfo } from "../types/types";
import { todoInfoFilterEnum, type MetaResponse } from "../types/types";
import axios, {type AxiosInstance, type AxiosResponse } from 'axios';

export const BASE_URL = "https://easydev.club/api/v1";


const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000
});


export async function createNewTodo(
  newTodo: TodoRequest,
): Promise<Todo> {
    const response: AxiosResponse<Todo> = await axiosInstance.post('/todos', newTodo)
    return response.data
}

export async function deleteTodo(id: number): Promise<void> {
    await axiosInstance.delete(`/todos/${id}`);
}

export const getTodos = async (
  status?: todoInfoFilterEnum,
): Promise<MetaResponse<Todo, TodoInfo>> => {
    const params = status ? { filter: status } : {};
    const response: AxiosResponse<MetaResponse<Todo, TodoInfo>> = await axiosInstance.get('/todos', { params });
    return response.data;
};

export const updateTodo = async (
  id: number,
  updatedData: TodoRequest,
): Promise<Todo> => {
    const response: AxiosResponse<Todo> = await axiosInstance.put(`/todos/${id}`, updatedData);
    return response.data;
};