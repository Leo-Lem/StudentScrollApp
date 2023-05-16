import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"
import extraReducers from "./actions"

const student = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers
})

export default student