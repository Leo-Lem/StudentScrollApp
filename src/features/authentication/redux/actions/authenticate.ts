import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"
import { setAuthenticated, setFailed } from "../slice"
import loadStudent from "../../../student/actions/loadStudent"

export default createAsyncThunk(
  "authentication/authenticate",
  async (info: { name?: string; email: string; password: string }, thunkAPI) => {
    const result: APIResult<{ id: number; token: string }> = await API.post(
      thunkAPI,
      "account",
      info,
      false
    )

    if (result.ok) {
      thunkAPI.dispatch(setAuthenticated({ studentId: result.value.id, token: result.value.token }))
      thunkAPI.dispatch(loadStudent())
    } else {
      switch (result.error.code) {
        case 401:
          thunkAPI.dispatch(setFailed("invalidCredentials"))
          break
        case 409:
          thunkAPI.dispatch(setFailed("emailInUse"))
          break
        default:
          thunkAPI.dispatch(setFailed("unknown"))
          console.error(result.error.message)
      }
    }
  }
)
