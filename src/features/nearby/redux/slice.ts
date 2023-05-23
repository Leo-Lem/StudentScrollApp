import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"
import handleAddLocation from "./actions/handleAddLocation"
import handleSetStatus from "./actions/handleSetStatus"

const nearby = createSlice({
  name: "nearby",
  initialState,
  reducers: {
    addLocation: handleAddLocation,
    setStatus: handleSetStatus
  }
})

export default nearby
