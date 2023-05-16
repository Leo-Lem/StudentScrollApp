import profiles from "./slice";

export default profiles.reducer

export const { addProfile, removeProfile } = profiles.actions
export { default as readProfile } from "./actions/readProfile"
export { default as updateProfile } from "./actions/updateProfile"