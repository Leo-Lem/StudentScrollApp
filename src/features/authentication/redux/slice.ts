import { createSlice } from "@reduxjs/toolkit"

import handleSignOut from "./reducers/handleSignOut"
import handleSetAuthenticated from "./reducers/handleSetAuthenticated"
import handleSetFailed from "./reducers/handleSetFailed"

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
export const { signOut, setAuthenticated, setFailed } = authentication.actions
