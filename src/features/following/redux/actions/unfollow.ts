import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../../redux"
import { removeFollowers, removeFollows } from "..";

export default createAsyncThunk(
  "following/unfollow",
  async (followId: number, thunkAPI) => {
    const studentId = tryGettingStudentId(thunkAPI)

    const response = await fetch(`/api/v1/students/${followId}/followers/${studentId}`, {
      method: "DELETE",
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (response.ok) {
      thunkAPI.dispatch(removeFollowers({ id: followId, followers: [studentId] }))
      thunkAPI.dispatch(removeFollows({ id: studentId, follows: [followId] }))
    } else throw new Error("Failed to unfollow: " + response.statusText)
  }
)
