import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "./state"

import handleAddProfile from "./reducers/handleAddProfile"
import handleRemoveProfile from "./reducers/handleRemoveProfile"

const profiles = createSlice({
  name: "profiles",
  initialState: initialState,
  reducers: {
    addProfile: handleAddProfile,
    removeProfile: handleRemoveProfile
  }
})

export default profiles
export const { addProfile, removeProfile } = profiles.actions
