import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"
import { tryGettingStudentId } from "../../../../lib/redux"

import Profile from "../../types/Profile"
import { addProfile } from "../slice"

export default createAsyncThunk(
  "profile/readProfile",
  async (studentId: number | undefined, thunkAPI) => {
    const id = studentId ?? tryGettingStudentId(thunkAPI)

    const result: APIResult<Profile> = await API.get(thunkAPI, `students/${id}`)

    if (result.ok) thunkAPI.dispatch(addProfile(result.value))
    else console.error(result.error.message)
  }
)
