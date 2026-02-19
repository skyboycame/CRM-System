import type { TodoInfoFilterEnum } from "../types/types";

 
 export interface GetParams {
  filter?: TodoInfoFilterEnum 
}

export type StatusType = 'loading' | 'fulfilled' | 'rejected' | 'idle'

export interface UserRegistration { 
  login: string; 
  username: string; 
  password: string; 
  email: string; 
  phoneNumber: string; 
}

export interface AuthData { 
  login: string; 
  password: string; 
}

export interface RefreshToken { 
  refreshToken: string; 
}

export interface Profile { 
  id: number; 
  username: string; 
  email: string; 
  date: string; 
  isBlocked: boolean; 
  roles: Role[]; 
  phoneNumber: string; 
}

export interface ProfileRequest { 
  username: string; 
  email: string; 
  phoneNumber: string; 
}

export interface PasswordRequest { 
  password: string; 
}

export interface Token {
 accessToken: string
 refreshToken: string
}

export type AccessToken = Pick<Token , 'accessToken'>

export type Role = 'ADMIN' | 'USER' | 'MODERATOR'

export type FailedRequst = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void
}