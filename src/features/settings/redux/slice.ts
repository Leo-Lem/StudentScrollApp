import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "./state"
import handleSetSettings from "./actions/handleSetSettings"

const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: handleSetSettings
  }
})

export default settings