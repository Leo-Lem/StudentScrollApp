import { createAsyncThunk } from "@reduxjs/toolkit"
import AuthenticationError from "../../types/AuthenticationError";
import { setAuthenticated, setFailed } from "..";

export default createAsyncThunk(
  "authentication/signUp",
  async (info: { name: string; email: string; password: string }, thunkAPI) => {
    const response = await fetch("/api/v1/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info)
    })

    if (response.ok) {
      const json: { id: number; token: string } = await response.json()
      thunkAPI.dispatch(setAuthenticated({ studentId: json.id, token: json.token }))
    } else switch (response.status) {
      case 401:
        thunkAPI.dispatch(setFailed(AuthenticationError.emailInUse))
        break
      default:
        thunkAPI.dispatch(setFailed(AuthenticationError.unknown))
    }
  }
)
