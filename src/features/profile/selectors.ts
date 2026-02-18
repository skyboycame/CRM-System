import type { RootState } from "../../services/store";

export const selectGetProfileData = (state: RootState) => state.profile.profileData
export const selectGetProfileError = (state: RootState) => state.profile.profileError
export const selectGetProfileStatus = (state: RootState) => state.profile.profileStatus
