import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingStudentId } from "../../../../redux"
import { removeFollowers, removeFollows } from ".."
import API from "../../../../lib/API"

export default createAsyncThunk("following/unfollow", async (followId: number, thunkAPI) => {
  const studentId = tryGettingStudentId(thunkAPI)

  const result = await API.del(thunkAPI, `students/${followId}/followers/${studentId}`)

  if (result.ok) {
    thunkAPI.dispatch(removeFollowers({ studentId: followId, followers: [studentId] }))
    thunkAPI.dispatch(removeFollows({ studentId: studentId, follows: [followId] }))
  } else {
    console.error(result.error.message)
  }
})
