import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader } from "../../../../redux"
import { addFollows } from "..";

export default createAsyncThunk(
  "following/readFollows",
  async (studentId: number, thunkAPI) => {
    const response = await fetch(`/api/v1/students/${studentId}/follows`, {
      method: "GET",
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (response.ok) thunkAPI.dispatch(addFollows({ id: studentId, follows: (await response.json()) as number[] }))
    else throw new Error("Failed to read follows: " + response.statusText)
  }
)
