import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"
import handleAddLocation from "./actions/handleAddLocation"

const nearby = createSlice({
  name: "nearby",
  initialState,
  reducers: {
    addLocation: handleAddLocation
  }
})

export default nearby
