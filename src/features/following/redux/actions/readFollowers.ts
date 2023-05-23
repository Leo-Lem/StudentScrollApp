import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"
import { tryGettingStudentId } from "../../../../lib/redux"

import { addFollowers } from ".."
import { Profile } from "../../../profiles"

export default createAsyncThunk(
  "following/readFollowers",
  async (studentId: number | undefined, thunkAPI) => {
    const id = studentId ?? tryGettingStudentId(thunkAPI)

    const result: APIResult<Profile[]> = await API.get(thunkAPI, `students/${id}/followers`)

    if (result.ok)
      thunkAPI.dispatch(
        addFollowers({ studentId: id, followers: result.value.map((f) => f.studentId) })
      )
    else console.error(result.error.message)
  }
)
