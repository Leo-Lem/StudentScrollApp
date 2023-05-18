import { createAsyncThunk } from "@reduxjs/toolkit"

import { addProfile } from ".."
import { tryGettingStudentId } from "../../../../redux"
import Profile from "../../types/Profile"
import Result from "../../../../lib/Result"
import API from "../../../../lib/API"

export default createAsyncThunk(
  "profile/readProfile",
  async (studentId: number | undefined, thunkAPI) => {
    const id = studentId ?? tryGettingStudentId(thunkAPI)

    const result: Result<Profile, API.Error> = await API.get(thunkAPI, `students/${id}/profile`)

    if (result.ok) thunkAPI.dispatch(addProfile({ studentId: id, profile: result.value }))
    else console.error(result.error.message)
  }
)
