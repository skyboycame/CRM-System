import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Profile } from "../../api/types";
import { getProfileData } from "../../api";
import type { RootState } from "../../services/store";

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