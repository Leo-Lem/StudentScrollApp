import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"
import handleAddLocation from "./actions/handleAddLocation"
import extraReducers from "./actions/actions"

const nearby = createSlice({
  name: "nearby",
  initialState,
  reducers: {
    addLocation: handleAddLocation
  },
  extraReducers
})

export default nearby
