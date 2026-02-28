import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { Profile } from "../../types/user/types";
import { getProfileData } from "../../api/user/request";

export const getProfileDataThunk = createAsyncThunk<
  Profile,
  undefined,
  { rejectValue: string }
>(
  "@@profile/getData",
  async (_, { rejectWithValue }) => {
    try {
      return await getProfileData();
    } catch {
      return rejectWithValue("Ошибка получения профиля");
    }
  },
  {
    condition: (_, { getState }) => {
      const { profileStatus } = (getState() as RootState).profile;
      if (profileStatus === "loading") {
        return false;
      }
    },
  }
);