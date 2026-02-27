import type { RootState } from "../../store/store";

export const selectProfileData = (state: RootState) => state.user.profileData
export const selectIsAuthChecked = (state: RootState) => state.user.isAuthChecked
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated
export const selectRegisterError = (state: RootState) => state.user.registerError
export const selectRegisterStatus = (state: RootState) => state.user.registerStatus

export const selectLoginStatus = (state: RootState) => state.user.loginStatus
export const selectLoginError = (state: RootState) => state.user.loginError

