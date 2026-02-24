import type { RefreshToken } from "../../api/types";

export const isRefreshToken = (data: unknown): data is RefreshToken => {
  const obj = data as Record<string, unknown>
  return typeof obj.refreshToken === 'string'
}