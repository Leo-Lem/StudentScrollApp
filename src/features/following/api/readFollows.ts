import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader } from "../../../redux"

export default createAsyncThunk(
  "profile/readFollows",
  async (studentId: number, thunkAPI): Promise<{ studentId: number, follows: number[] }> => {
    const response = await fetch(`/api/v1/students/${studentId}/follows`, {
      method: "GET",
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (response.ok) return { studentId, follows: await response.json() as number[] }
    else throw new Error("Failed to read follows: " + response.statusText)
  }
)
