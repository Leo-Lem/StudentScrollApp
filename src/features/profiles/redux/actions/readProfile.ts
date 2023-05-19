import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"
import { tryGettingStudentId } from "../../../../lib/redux"

import { addProfile } from ".."
import Profile from "../../types/Profile"

export default createAsyncThunk(
  "profile/readProfile",
  async (studentId: number | undefined, thunkAPI) => {
    const id = studentId ?? tryGettingStudentId(thunkAPI)

    const result: APIResult<Profile> = await API.get(thunkAPI, `students/${id}/profile`)

    if (result.ok) thunkAPI.dispatch(addProfile({ studentId: id, profile: result.value }))
    else console.error(result.error.message)
  }
)
