import { createSlice } from "@reduxjs/toolkit"

import handleSignOut from "./actions/handleSignOut"
import handleSetAuthenticated from "./actions/handleSetAuthenticated"
import handleSetFailed from "./actions/handleSetFailed"

import { initialState } from "./state"

const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    signOut: handleSignOut,
    setAuthenticated: handleSetAuthenticated,
    setFailed: handleSetFailed
  }
})

export default authentication
