import { createAsyncThunk } from "@reduxjs/toolkit"

import API from "../../../lib/API"
import readProfile from "../../profiles/redux/actions/readProfile"

import { removeFollow } from "../slice"
import { tryGettingStudentId } from "../../../lib/redux"

export default createAsyncThunk("student/unfollow", async (followId: number, thunkAPI) => {
  const result = await API.del(thunkAPI, `students/${followId}/followers`)

  if (result.ok) {
    thunkAPI.dispatch(removeFollow(followId))
    thunkAPI.dispatch(readProfile(followId))
    thunkAPI.dispatch(readProfile(tryGettingStudentId(thunkAPI)))
  } else console.error(result.error.message)
})
