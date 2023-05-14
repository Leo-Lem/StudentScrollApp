import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader } from "../../../redux"

export default createAsyncThunk(
  "profile/readFollowers",
  async (studentId: number, thunkAPI): Promise<{ studentId: number, followers: number[] }> => {
    const response = await fetch(`/api/v1/students/${studentId}/followers`, {
      method: "GET",
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (response.ok) return { studentId, followers: await response.json() as number[] }
    else throw new Error("Failed to read followers: " + response.statusText)
  }
)
