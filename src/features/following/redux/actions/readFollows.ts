import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"
import { tryGettingStudentId } from "../../../../lib/redux"

import { addFollows } from ".."
import { Profile } from "../../../profiles"

export default createAsyncThunk(
  "following/readFollows",
  async (studentId: number | undefined, thunkAPI) => {
    const id = studentId ?? tryGettingStudentId(thunkAPI)

    const result: APIResult<Profile[]> = await API.get(thunkAPI, `students/${id}/follows`)

    if (result.ok)
      thunkAPI.dispatch(
        addFollows({ studentId: id, follows: result.value.map((f) => f.studentId) })
      )
    else console.error(result.error.message)
  }
)
