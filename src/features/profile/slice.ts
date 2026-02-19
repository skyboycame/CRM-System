import { createSlice } from "@reduxjs/toolkit";
import type { Profile, StatusType } from "../../api/types";
import { getProfileDataThunk } from "./thunk";

interface initStateType {
  profileStatus: StatusType,
  profileError: string | undefined,
  profileData : Profile | null
}

const initialState: initStateType = {
  profileStatus: 'idle',
  profileError: undefined,
  profileData: null
}

const profileSlice = createSlice({
  name: '@@profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getProfileDataThunk.pending, (state) => {
      state.profileStatus = 'loading'
    })
    .addCase(getProfileDataThunk.fulfilled, (state, action) => {
      state.profileData = action.payload;
      state.profileStatus = 'fulfilled'
    })
    .addCase(getProfileDataThunk.rejected, (state, action) => {
      state.profileError = action.payload ?? action.error.message ?? 'неизвестная ошибка';
      state.profileStatus = 'rejected'
    })
  }
})


export const profileReducer = profileSlice.reducer