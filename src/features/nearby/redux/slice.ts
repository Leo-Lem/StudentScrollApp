import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"
import handleAddLocation from "./actions/handleAddLocation"
import handleSetAllowed from "./actions/handleSetAllowed"

const nearby = createSlice({
  name: "nearby",
  initialState,
  reducers: {
    addLocation: handleAddLocation,
    setAllowed: handleSetAllowed
  }
})

export default nearby
