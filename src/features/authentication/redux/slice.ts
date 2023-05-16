import { createSlice } from "@reduxjs/toolkit"

import signOut from "./actions/signOut"
import setAuthenticated from "./actions/setAuthenticated"
import setFailed from "./actions/setFailed"

import { initialState } from "./state"

const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: { signOut, setAuthenticated, setFailed }
})

export default authentication