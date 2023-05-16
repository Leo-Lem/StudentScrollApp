import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader } from "../../../../redux"
import { addFollowers } from "..";

export default createAsyncThunk(
  "following/readFollowers",
  async (studentId: number, thunkAPI) => {
    const response = await fetch(`/api/v1/students/${studentId}/followers`, {
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (response.ok) thunkAPI.dispatch(addFollowers({ id: studentId, followers: (await response.json()) as number[] }))
    else throw new Error("Failed to read followers: " + response.statusText)
  }
)
