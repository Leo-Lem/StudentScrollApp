import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../../redux"
import { addFollows } from ".."

export default createAsyncThunk(
  "following/readFollows",
  async (studentId: number | undefined, thunkAPI) => {
    const id = studentId ?? tryGettingStudentId(thunkAPI)

    const response = await fetch(`/api/v1/students/${id}/follows`, {
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (response.ok)
      thunkAPI.dispatch(addFollows({ studentId: id, follows: (await response.json()) as number[] }))
    else throw new Error("Failed to read follows: " + response.statusText)
  }
)
