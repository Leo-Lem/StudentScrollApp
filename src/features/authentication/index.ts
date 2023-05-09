import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { signIn, signUp } from "./api"
import { AuthenticationStatus, AuthenticationError } from "./types"

export interface AuthenticationState {
  status: AuthenticationStatus
  token?: string
  studentId?: number
  error?: AuthenticationError
}

const token = localStorage.getItem("token")
const studentId = localStorage.getItem("studentId")

const initialState: AuthenticationState = {
  status:
    token !== null && studentId !== null
      ? AuthenticationStatus.authenticated
      : AuthenticationStatus.unauthenticated,
  token: token !== null ? token : undefined,
  studentId: studentId !== null ? parseInt(studentId) : undefined
}

const authentication = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.status = AuthenticationStatus.unauthenticated
      state.token = undefined
      localStorage.removeItem("token")
      state.studentId = undefined
      localStorage.removeItem("studentId")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error = action.payload.error
          state.status = AuthenticationStatus.failed
        } else {
          state.token = action.payload.token
          localStorage.setItem("token", state.token)
          state.studentId = action.payload.studentId
          localStorage.setItem("studentId", state.studentId.toString())
          state.status = AuthenticationStatus.authenticated
        }
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error = action.payload.error
          state.status = AuthenticationStatus.failed
        } else {
          state.token = action.payload.token
          localStorage.setItem("token", state.token)
          state.studentId = action.payload.studentId
          localStorage.setItem("studentId", state.studentId.toString())
          state.status = AuthenticationStatus.authenticated
        }
      })
  }
})

export { signIn, signUp }
export const { signOut } = authentication.actions

export default authentication.reducer
