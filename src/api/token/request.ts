import axios from "axios";
import { api } from "../axiosInstance";
import type { RefreshToken, Token } from "./types";
import { tokenManager } from "../../features/tokens/tokenManages";
import { store } from "../../services/store";
import { setIsAuth, setIsAuthChecked } from "../../features/user/userSlice";

export async function refreshTokenApi(
  refreshToken: RefreshToken,
): Promise<Token> {
  try {
    const response = await api.post<Token>(`/auth/refresh`, refreshToken);
    const tokens = response.data;
    return tokens;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data || "ошибка обновления токена";
    }
    throw e;
  }
}

export async function checkAuth() {

  const refreshToken = tokenManager.getRefreshToken();
  if (!refreshToken) {
    store.dispatch(setIsAuth(false));
    store.dispatch(setIsAuthChecked(true));
    return;
  }
    store.dispatch(setIsAuth(true));
    store.dispatch(setIsAuthChecked(true));
}
