import { createAsyncThunk } from "@reduxjs/toolkit"

import API from "../../../../lib/API"
import { tryGettingStudentId } from "../../../../lib/redux"

import { removeFollowers, removeFollows } from ".."

export default createAsyncThunk("following/unfollow", async (followId: number, thunkAPI) => {
  const result = await API.del(thunkAPI, `students/${followId}/followers`)

  if (result.ok) {
    const studentId = tryGettingStudentId(thunkAPI)
    thunkAPI.dispatch(removeFollowers({ studentId: followId, followers: [studentId] }))
    thunkAPI.dispatch(removeFollows({ studentId: studentId, follows: [followId] }))
  } else {
    console.error(result.error.message)
  }
})
