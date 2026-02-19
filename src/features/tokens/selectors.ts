import type { RootState } from "../../services/store";

export const selectAuthStatus = (state: RootState) => state.token.status
export const selectAuthError = (state: RootState) => state.token.error
export const selectAccessToken = (state: RootState) => state.token.accessToken