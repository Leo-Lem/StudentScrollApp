import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingStudentId } from "../../../../redux"
import { addFollowers, addFollows } from ".."
import API from "../../../../lib/API"

export default createAsyncThunk("following/follow", async (followId: number, thunkAPI) => {
  const studentId = tryGettingStudentId(thunkAPI)

  // TODO: verify this with the empty body
  const result = await API.post(thunkAPI, `students/${followId}/followers/${studentId}`, {})

  if (result.ok) {
    thunkAPI.dispatch(addFollowers({ studentId: followId, followers: [studentId] }))
    thunkAPI.dispatch(addFollows({ studentId: studentId, follows: [followId] }))
  } else {
    console.error(result.error.message)
  }
})
