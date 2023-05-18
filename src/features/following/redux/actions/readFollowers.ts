import { createAsyncThunk } from "@reduxjs/toolkit"

import Result from "../../../../lib/Result"
import API from "../../../../lib/API"

import { tryGettingStudentId } from "../../../../redux"
import { addFollowers } from ".."

export default createAsyncThunk(
  "following/readFollowers",
  async (studentId: number | undefined, thunkAPI) => {
    const id = studentId ?? tryGettingStudentId(thunkAPI)

    const result: Result<number[], API.Error> = await API.get(thunkAPI, `students/${id}/followers`)

    if (result.ok)
      thunkAPI.dispatch(addFollowers({ studentId: id, followers: result.value }))
    else
      console.error(result.error.message)
  }
)
