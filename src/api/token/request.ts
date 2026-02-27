import axios from "axios";
import { api } from "../axiosInstance";
import type { RefreshToken, Token } from "../../types/token/types";

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
