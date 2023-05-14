import { createSlice } from "@reduxjs/toolkit"

import Settings from "./types/Settings"
import readSettings from "./api/readSettings"
import updateSettings from "./api/updateSettings"

export interface SettingsState {
  settings?: Settings
}

const settings = createSlice({
  name: "settings",
  initialState: {} as SettingsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(readSettings.fulfilled, (state, action) => {
        state.settings = action.payload
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.settings = action.payload
      })
  }
})

export default settings.reducer
export { readSettings, updateSettings }
