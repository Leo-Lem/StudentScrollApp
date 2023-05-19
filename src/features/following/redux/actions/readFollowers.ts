import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"
import { tryGettingStudentId } from "../../../../lib/redux"

import { addFollowers } from ".."

export default createAsyncThunk(
  "following/readFollowers",
  async (studentId: number | undefined, thunkAPI) => {
    const id = studentId ?? tryGettingStudentId(thunkAPI)

    const result: APIResult<number[]> = await API.get(thunkAPI, `students/${id}/followers`)

    if (result.ok) thunkAPI.dispatch(addFollowers({ studentId: id, followers: result.value }))
    else console.error(result.error.message)
  }
)
