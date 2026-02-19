import axios from "axios";
import type { TodoRequest, Todo, TodoInfo } from "../types/types";
import { TodoInfoFilterEnum, type MetaResponse } from "../types/types";
import { api, } from "./axiosInstance";
import type { AuthData, Profile, RefreshToken, Token, UserRegistration } from "./types";
import { refreshClient } from "./tokenInstanse";

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


export async function registerUser(userRegisterData: UserRegistration): Promise<Profile> {
  try {
    const response = await api.post<Profile>(`/auth/signup`, userRegisterData)
    const profileData = response.data
    return profileData
  }
  catch(e) {
    if(axios.isAxiosError(e)) {
      throw e.response?.data || 'ошибка регистрации'
    }
    throw e
  }
}

export async function loginUser(loginData: AuthData): Promise<Token> {
  try {
    const response = await api.post<Token>(`/auth/signin`, loginData);
    const tokens = response.data;
    return tokens

  } catch (e) {
    if(axios.isAxiosError(e)) {
      throw e.response?.data || 'ошибка регистрации'
    }
    throw e
  }
}

export async function logoutUser() : Promise<void> {
  try {
    await api.post('/user/logout')
  } catch (e) {
     if(axios.isAxiosError(e)) {
      throw e.response?.data || 'ошибка регистрации'
    }
    throw e
  }
}

export async function refreshTokenApi(refreshToken: RefreshToken): Promise<Token> {
  try {
    const response = await refreshClient.post<Token>(`/auth/refresh`,refreshToken)
    const tokens = response.data
    return tokens
  }
  catch (e) {
    if(axios.isAxiosError(e)) {
      throw e.response?.data || 'ошибка обновления токена'
    }
    throw e 
  }
}

export async function getProfileData(): Promise<Profile> {
   try {
    const response = await api.get<Profile>(`/user/profile`)
    const profileData = response.data
    return profileData
  }
  catch (e) {
    if(axios.isAxiosError(e)) {
      throw e.response?.data || 'ошибка получения данных профиля'
    }
    throw e 
  }
}

// skyboycame 12345678
