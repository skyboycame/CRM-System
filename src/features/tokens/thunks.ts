import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AccessToken } from "../../types/token/types";
import { refreshTokenApi } from "../../api/token/request";
import { tokenManager } from "./tokenManages";


export const refreshTokenThunk = createAsyncThunk<
AccessToken,
 void,
 { rejectValue: string}>
 ('@@tokens/refreshTokens', async ( _, { rejectWithValue }) => {
   try {
    const oldRefreshToken = tokenManager.getRefreshToken()
    if(!oldRefreshToken) return rejectWithValue('Нет refresh токена')

    if(oldRefreshToken) {
      const {accessToken, refreshToken}  = await refreshTokenApi({refreshToken: oldRefreshToken}) 
      
      tokenManager.setRefreshToken(refreshToken)
      return {
        accessToken
      }
    }
    else {
      return rejectWithValue("Некорректный refresh токен");
      }
   } 
   catch (error) {
      tokenManager.clearTokens()
      if (typeof error === 'string') {
        return rejectWithValue(error);
    }
  return rejectWithValue('Неизвестная ошибка');
   }
 })