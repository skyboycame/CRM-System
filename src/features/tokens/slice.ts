import { createSlice } from "@reduxjs/toolkit";
import { refreshTokenThunk } from "./thunks";
import type { AccessToken } from "../../api/types";

interface initStateType {
  status: "loading" | "idle";
  error: string | undefined;
  accessToken: AccessToken | null;
}

const initialState: initStateType = {
  status: "idle",
  error: undefined,
  accessToken: null,
};

const tokenSlice = createSlice({
  name: "@@tokens",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.accessToken = action.payload;
      })
      .addCase(refreshTokenThunk.rejected, (state, action) => {
        state.status = "idle";
        state.error =
          action.payload ?? action.error.message ?? "Ошибка рефреш токена";
      })
      .addCase(refreshTokenThunk.pending, (state) => {
        state.status = "loading";
      });
  },
});
export const {setAccessToken} = tokenSlice.actions
export const tokenReducer = tokenSlice.reducer;
