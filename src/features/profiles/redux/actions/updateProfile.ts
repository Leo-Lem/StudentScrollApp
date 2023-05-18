import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../../redux"
import Profile from "../../types/Profile"
import { addProfile } from ".."
import Result from "../../../../lib/Result"
import API from "../../../../lib/API"

export default createAsyncThunk(
  "profile/updateProfile",
  async (info: { newName?: string; newBio?: string; newIcon?: string }, thunkAPI) => {
    const studentId = tryGettingStudentId(thunkAPI)

    const result: Result<Profile, API.Error> = await API.put(thunkAPI, `students/${studentId}/profile`, info)

    if (result.ok) thunkAPI.dispatch(addProfile({ studentId, profile: result.value }))
    else console.error(result.error.message)
  }
)
