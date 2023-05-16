import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../../redux"
import { addFollowers, addFollows } from ".."

export default createAsyncThunk("following/follow", async (followId: number, thunkAPI) => {
  const studentId = tryGettingStudentId(thunkAPI)

  const response = await fetch(`/api/v1/students/${followId}/followers/${studentId}`, {
    method: "POST",
    headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
  })

  if (response.ok) {
    thunkAPI.dispatch(addFollowers({ studentId: followId, followers: [studentId] }))
    thunkAPI.dispatch(addFollows({ studentId: studentId, follows: [followId] }))
  } else throw new Error("Failed to follow: " + response.statusText)
})
