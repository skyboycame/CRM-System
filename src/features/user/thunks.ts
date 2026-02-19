import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthData, Profile, Token, UserRegistration } from "../../api/types";
import { loginUser, logoutUser, registerUser } from "../../api";
import { store } from "../../services/store";
import { setAccessToken } from "../tokens/slice";

export const registerUserThunk = createAsyncThunk<
  Profile,
  UserRegistration,
  { rejectValue: string }
>("@@user/register", async (data, { rejectWithValue }) => {
  try {
    const response =  await registerUser(data);
    return response
  } catch (error) {
      if (typeof error === 'string') {
        return rejectWithValue(error);
    }

  return rejectWithValue('Неизвестная ошибка');
    }
  }
);


export const loginUserThunk = createAsyncThunk<
Token,
AuthData,
 { rejectValue : string }
>('@@user/login', async (loginData , {rejectWithValue}) => {
  try {
    const response = await loginUser(loginData);
    store.dispatch(setAccessToken(response.accessToken))
    localStorage.setItem('refreshToken', response.refreshToken);
    return response
  } catch (error) {
       if (typeof error === 'string') {
        return rejectWithValue(error);
    }

  return rejectWithValue('Неизвестная ошибка');
    }
  }
)

export const logoutUserThunk = createAsyncThunk(
  '@@user/logout', async () => {
    try {
      await logoutUser();
    }
    catch (e) {
      console.error(e)
    }
    finally {
      store.dispatch(setAccessToken(null))
      localStorage.removeItem('refreshToken');
    }
  }
)