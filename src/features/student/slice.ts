import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"
import extraReducers from "./reducers"
import handleSetSettings from "./reducers/handleSetSettings"
import handleAddFollow from "./reducers/handleAddFollow"
import handleRemoveFollow from "./reducers/handleRemoveFollow"

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
