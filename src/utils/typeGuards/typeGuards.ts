import type { RefreshToken, UserRegistration } from "../../api/types";


export const isUserRegistration = (data: unknown): data is UserRegistration => {
  if(typeof data !== 'object' || data === null) return false

  const obj = data as Record<string, unknown>
  return ( 
    typeof obj.login === 'string' &&
    typeof obj.username === 'string' &&
    typeof obj.password === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.phoneNumber === 'string'
  );
}


export const isRefreshToken = (data: unknown): data is RefreshToken => {
  const obj = data as Record<string, unknown>
  return typeof obj.refreshToken === 'string'
}