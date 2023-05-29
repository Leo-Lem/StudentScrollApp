import { createAsyncThunk } from "@reduxjs/toolkit"

import API from "../../../lib/API"
import readProfile from "../../profiles/redux/actions/readProfile"

import { addFollow } from "../slice"
import { tryGettingStudentId } from "../../../lib/redux"

export default createAsyncThunk("student/follow", async (followId: number, thunkAPI) => {
  const result = await API.post(thunkAPI, `students/${followId}/followers`, {})

  if (result.ok) {
    thunkAPI.dispatch(addFollow(followId))
    thunkAPI.dispatch(readProfile(followId))
    thunkAPI.dispatch(readProfile(tryGettingStudentId(thunkAPI)))
  } else console.error(result.error.message)
})
