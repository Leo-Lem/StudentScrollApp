import { createSlice } from "@reduxjs/toolkit"

import signIn from "./api/signIn"
import signUp from "./api/signUp"
import AuthenticationError from "./types/AuthenticationError"
import AuthenticationStatus from "./types/AuthenticationStatus"

export interface AuthenticationState {
  status: AuthenticationStatus
  token?: string
  studentId?: number
  error?: AuthenticationError
}

const token = sessionStorage.getItem("token")
const studentId = sessionStorage.getItem("studentId")

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
      state.studentId = undefined

      sessionStorage.removeItem("token")
      sessionStorage.removeItem("studentId")
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
          state.studentId = action.payload.studentId

          sessionStorage.setItem("token", state.token)
          sessionStorage.setItem("studentId", state.studentId.toString())

          state.status = AuthenticationStatus.authenticated
        }
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error = action.payload.error
          state.status = AuthenticationStatus.failed
        } else {
          state.token = action.payload.token
          state.studentId = action.payload.studentId

          sessionStorage.setItem("token", state.token)
          sessionStorage.setItem("studentId", state.studentId.toString())

          state.status = AuthenticationStatus.authenticated
        }
      })
  }
})

export { signIn, signUp }
export const { signOut } = authentication.actions

export default authentication.reducer
