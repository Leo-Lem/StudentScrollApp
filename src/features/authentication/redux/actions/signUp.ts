import { createAsyncThunk } from "@reduxjs/toolkit"

import { loadStudent } from "../../../student"
import API, { APIResult } from "../../../../lib/API"

import { setAuthenticated, setFailed } from ".."
import AuthenticationError from "../../types/AuthenticationError"

export default createAsyncThunk(
  "authentication/signUp",
  async (info: { name: string; email: string; password: string }, thunkAPI) => {
    const result: APIResult<{ id: number; token: string }> = await API.post(
      thunkAPI,
      "students",
      info,
      false
    )

    if (result.ok) {
      thunkAPI.dispatch(setAuthenticated({ studentId: result.value.id, token: result.value.token }))
      thunkAPI.dispatch(loadStudent())
    } else {
      switch (result.error.code) {
        case 409:
          thunkAPI.dispatch(setFailed(AuthenticationError.emailInUse))
          break
        default:
          thunkAPI.dispatch(setFailed(AuthenticationError.unknown))
          console.error(result.error.message)
      }
    }
  }
)
