import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"
import extraReducers from "./actions/actions"
import handleSetSettings from "./actions/handleSetSettings"
import handleAddFollow from "./actions/handleAddFollow"
import handleRemoveFollow from "./actions/handleRemoveFollow"

const student = createSlice({
  name: "student",
  initialState,
  reducers: {
    setSettings: handleSetSettings,
    addFollow: handleAddFollow,
    removeFollow: handleRemoveFollow
  },
  extraReducers
})

export default student
export const { setSettings, addFollow, removeFollow } = student.actions
