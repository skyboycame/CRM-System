import { createAsyncThunk } from "@reduxjs/toolkit";
import type {AccessToken } from "../../api/types"
import { refreshTokenApi } from "../../api";
import { store } from "../../services/store";
import { setAccessToken } from "./slice";


export const refreshTokenThunk = createAsyncThunk<
AccessToken,
 void,
 { rejectValue: string}>
 ('@@tokens/refreshTokens', async ( _, { rejectWithValue }) => {
   try {
    const oldRefreshToken = localStorage.getItem('refreshToken')
    if(!oldRefreshToken) return rejectWithValue('Нет refresh токена')

    if(oldRefreshToken) {
      const {accessToken, refreshToken}  = await refreshTokenApi({refreshToken: oldRefreshToken}) 
      
      localStorage.setItem("refreshToken", refreshToken);
      return {
        accessToken
      }
    }
    else {
      return rejectWithValue("Некорректный refresh токен");
      }
   } 
   catch (error) {
      store.dispatch(setAccessToken(null))
      localStorage.removeItem("refreshToken");
      if (typeof error === 'string') {
        return rejectWithValue(error);
    }
  return rejectWithValue('Неизвестная ошибка');
   }
 })