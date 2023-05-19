import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"
import { tryGettingStudentId } from "../../../../lib/redux"

import { addFollows } from ".."

export default createAsyncThunk(
  "following/readFollows",
  async (studentId: number | undefined, thunkAPI) => {
    const id = studentId ?? tryGettingStudentId(thunkAPI)

    const result: APIResult<number[]> = await API.get(thunkAPI, `students/${id}/follows`)

    if (result.ok) thunkAPI.dispatch(addFollows({ studentId: id, follows: result.value }))
    else console.error(result.error.message)
  }
)
