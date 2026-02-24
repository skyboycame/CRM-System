import axios from "axios"
import { api } from "../axiosInstance"
import type { AuthData, Profile, UserRegistration } from "./types"
import type { Token } from "../token/types"

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
