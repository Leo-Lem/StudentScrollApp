import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import Profile from "./types/Profile"
import readProfile from "./api/readProfile"
import updateProfile from "./api/updateProfile"

export interface ProfileState {
  [id: number]: Profile
}

const profiles = createSlice({
  name: "profiles",
  initialState: {} as ProfileState,
  reducers: {
    resetProfile: (state, action: PayloadAction<number>) => {
      delete state[action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(readProfile.fulfilled, (state, action) => {
        state[action.payload.id] = action.payload.profile
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state[action.payload.id] = action.payload.profile
      })
  }
})

export default profiles.reducer
export { readProfile, updateProfile }
export const { resetProfile } = profiles.actions
