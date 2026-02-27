import { createSlice } from "@reduxjs/toolkit";
import {
  checkAuthThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
} from "./thunks";
import { refreshTokenThunk } from "../tokens/thunks";
import type { Profile } from "../../types/user/types";
import type { StatusType } from "../../types/api/types";

interface UserState {
  profileData: Profile | null;
  registerError: string | undefined;
  isAuthenticated: boolean; //  авторизован или нет
  isAuthChecked: boolean; //  Флаг окончания проверки. Нужен для прелоадера
  registerStatus: StatusType;
  loginError: string | undefined;
  loginStatus: StatusType;
}

const initialState: UserState = {
  profileData: null,
  registerError: undefined,
  isAuthenticated: false,
  isAuthChecked: false,
  registerStatus: "idle",
  loginError: undefined,
  loginStatus: "idle",
};

const userSlice = createSlice({
  name: "@@user",
  initialState,
  reducers: {
    resetState: () => initialState,
    setIsAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.registerError = undefined;
        state.registerStatus = "loading";
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.profileData = action.payload;
        state.registerStatus = "fulfilled";
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.registerError =
          action.payload ?? action.error.message ?? "Ошибка регистрации";
        state.registerStatus = "rejected";
        state.isAuthChecked = true;
      });

    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loginError = undefined;
        state.loginStatus = "loading";
      })
      .addCase(loginUserThunk.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loginStatus = "fulfilled";
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loginError =
          action.payload ?? action.error.message ?? "Ошибка авторизации";
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.loginStatus = "rejected";
      });

    builder
      .addCase(logoutUserThunk.fulfilled, () => {
        return { ...initialState, isAuthChecked: true };
      })
      .addCase(logoutUserThunk.rejected, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.profileData = null;
        state.loginStatus = "idle";
        state.registerError = undefined;
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.isAuthChecked = false;
        state.isAuthChecked = false;
      });

    builder
      .addCase(refreshTokenThunk.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(refreshTokenThunk.rejected, (state) => {
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      });

    builder
      .addCase(checkAuthThunk.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(checkAuthThunk.rejected, (state) => {
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      });
  },
});

export const { resetState, setIsAuth, setIsAuthChecked } = userSlice.actions;
export const userReducer = userSlice.reducer;
