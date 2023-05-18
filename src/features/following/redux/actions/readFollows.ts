import { createAsyncThunk } from "@reduxjs/toolkit"

import API from "../../../../lib/API"
import Result from "../../../../lib/Result"

import { tryGettingStudentId } from "../../../../redux"
import { addFollows } from ".."

export default createAsyncThunk(
  "following/readFollows",
  async (studentId: number | undefined, thunkAPI) => {
    const id = studentId ?? tryGettingStudentId(thunkAPI)

    const result: Result<number[], API.Error> = await API.get(thunkAPI, `students/${id}/follows`)

    if (result.ok) thunkAPI.dispatch(addFollows({ studentId: id, follows: result.value }))
    else console.error(result.error.message)
  }
)
