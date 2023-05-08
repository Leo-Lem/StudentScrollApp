import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import AuthenticationError from "./types/AuthenticationError"
import AuthenticationStatus from "./types/AuthenticationStatus"

export interface AuthenticationState {
  status: AuthenticationStatus
  token?: string
  studentId?: number
  error?: AuthenticationError
}

const token = localStorage.getItem("token")
const studentId = localStorage.getItem("studentId")

const initialState: AuthenticationState = {
  status: token !== null && studentId !== null ? AuthenticationStatus.authenticated : AuthenticationStatus.unauthenticated,
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

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (info: { email: string; password: string }) => {
    const response = await fetch("/api/v1/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info)
    })

    if (response.ok) {
      const json: { id: number; token: string } = await response.json()
      return { studentId: json.id, token: json.token }
    }

    switch (response.status) {
      case 401:
        return { error: AuthenticationError.invalidCredentials }
      default:
        return { error: AuthenticationError.unknown }
    }
  }
)

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (info: { name: string; email: string; password: string }) => {
    const response = await fetch("/api/v1/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info)
    })

    if (response.ok) {
      const json: { id: number; token: string } = await response.json()
      return { studentId: json.id, token: json.token }
    }

    switch (response.status) {
      case 401:
        return { error: AuthenticationError.emailInUse }
      default:
        return { error: AuthenticationError.unknown }
    }
  }
)

export const { signOut } = authentication.actions

export default authentication.reducer
