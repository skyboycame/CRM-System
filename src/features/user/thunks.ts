import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  AuthData,
  Profile,
  UserRegistration,
} from "../../types/user/types";
import type { Token } from "../../types/token/types";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../../api/user/request";
import { tokenManager } from "../tokens/tokenManages";
import { getProfileDataThunk } from "../profile/thunk";

export const registerUserThunk = createAsyncThunk<
  Profile,
  UserRegistration,
  { rejectValue: string }
>("@@user/register", async (data, { rejectWithValue }) => {
  try {
    const response = await registerUser(data);
    return response;
  } catch (error) {
    if (typeof error === "string") {
      return rejectWithValue(error);
    }

    return rejectWithValue("Неизвестная ошибка");
  }
});

export const loginUserThunk = createAsyncThunk<
  Token,
  AuthData,
  { rejectValue: string }
>("@@user/login", async (loginData, { rejectWithValue }) => {
  try {
    const response = await loginUser(loginData);
    tokenManager.setAccessToken(response.accessToken);
    tokenManager.setRefreshToken(response.refreshToken);
    return response;
  } catch (error) {
    if (typeof error === "string") {
      return rejectWithValue(error);
    }

    return rejectWithValue("Неизвестная ошибка");
  }
});

export const logoutUserThunk = createAsyncThunk("@@user/logout", async () => {
  try {
    await logoutUser();
  } catch (e) {
    console.error(e);
  } finally {
    tokenManager.clearTokens();
  }
});

export const checkAuthThunk = createAsyncThunk(
  "@@user/checkAuth",
  async (_, {dispatch, rejectWithValue }) => {
    try {
      dispatch(getProfileDataThunk());
    } catch (error) {
      if (typeof error === "string") {
        return rejectWithValue(error);
      }

      return rejectWithValue("Неизвестная ошибка");
    }
  },
);
