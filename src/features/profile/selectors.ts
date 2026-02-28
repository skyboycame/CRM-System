import type { RootState } from "../../store/store";

export const selectGetProfileData = (state: RootState) => state.profile.profileData
export const selectGetProfileError = (state: RootState) => state.profile.profileError
export const selectGetProfileStatus = (state: RootState) => state.profile.profileStatus
