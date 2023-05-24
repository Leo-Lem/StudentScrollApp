import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"
import handleSetStatus from "./actions/handleSetStatus"
import handleSetLocation from "./actions/handleSetLocation"

const nearby = createSlice({
  name: "nearby",
  initialState,
  reducers: {
    setStatus: handleSetStatus,
    setLocation: handleSetLocation
  }
})

export default nearby
export const { setStatus, setLocation } = nearby.actions
