import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../../redux"
import { addFollowers } from "..";

export default createAsyncThunk(
  "following/readFollowers",
  async (studentId: number | undefined, thunkAPI) => {
    const id = studentId ?? tryGettingStudentId(thunkAPI)

    const response = await fetch(`/api/v1/students/${id}/followers`, {
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (response.ok) thunkAPI.dispatch(addFollowers({ studentId: id, followers: (await response.json()) as number[] }))
    else throw new Error("Failed to read followers: " + response.statusText)
  }
)
