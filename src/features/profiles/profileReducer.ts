import { createSlice } from "@reduxjs/toolkit"

import Profile from "./types/Profile"
import readProfile from "./api/readProfile"
import updateProfile from "./api/updateProfile"

export interface ProfileState {
  [id: number]: Profile
}

export default createSlice({
  name: "profiles",
  initialState: {} as ProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(readProfile.fulfilled, (state, action) => {
        if (action.payload.id in state) state[action.payload.id] = action.payload.profile
        else state[action.payload.id] = action.payload.profile
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (action.payload.id in state) state[action.payload.id] = action.payload.profile
        else state[action.payload.id] = action.payload.profile
      })
  }
}).reducer

export { readProfile, updateProfile }