import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"
import extraReducers from "./actions/actions"
import handleSetSettings from "./actions/handleSetSettings"

const student = createSlice({
  name: "student",
  initialState,
  reducers: {
    setSettings: handleSetSettings
  },
  extraReducers
})

export default student
