import { createAsyncThunk } from "@reduxjs/toolkit"

import AuthenticationError from "../../types/AuthenticationError"
import { setAuthenticated, setFailed } from ".."
import { loadStudent } from "../../../student"

export default createAsyncThunk(
  "authentication/signIn",
  async (info: { email: string; password: string }, thunkAPI) => {
    const response = await fetch("/api/v1/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info)
    })

    if (response.ok) {
      const json: { id: number; token: string } = await response.json()
      thunkAPI.dispatch(setAuthenticated({ studentId: json.id, token: json.token }))
      thunkAPI.dispatch(loadStudent())
    } else
      switch (response.status) {
        case 401:
          thunkAPI.dispatch(setFailed(AuthenticationError.invalidCredentials))
          break
        default:
          thunkAPI.dispatch(setFailed(AuthenticationError.unknown))
      }
  }
)
