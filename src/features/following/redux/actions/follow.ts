import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingStudentId } from "../../../../lib/redux"
import API from "../../../../lib/API"

import { addFollowers, addFollows } from ".."

export default createAsyncThunk("following/follow", async (followId: number, thunkAPI) => {
  const result = await API.post(thunkAPI, `students/${followId}/followers`, {})

  if (result.ok) {
    const studentId = tryGettingStudentId(thunkAPI.getState())
    thunkAPI.dispatch(addFollowers({ studentId: followId, followers: [studentId] }))
    thunkAPI.dispatch(addFollows({ studentId: studentId, follows: [followId] }))
  } else {
    console.error(result.error.message)
  }
})
