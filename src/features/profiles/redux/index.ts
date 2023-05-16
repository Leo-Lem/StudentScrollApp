import profiles from "./slice";

export default profiles.reducer

export const { addProfile, removeProfile } = profiles.actions
export { default as readProfile } from "./api/readProfile"
export { default as updateProfile } from "./api/updateProfile"