import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../redux"
import readProfile from "./readProfile"

export default createAsyncThunk(
  "profile/unfollow",
  async (followId: number, thunkAPI): Promise<void> => {
    const studentId = tryGettingStudentId(thunkAPI)

    const response = await fetch(`/api/v1/students/${followId}/followers/${studentId}`, {
      method: "DELETE",
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (response.ok && studentId !== undefined) {
      thunkAPI.dispatch(readProfile(followId))
      thunkAPI.dispatch(readProfile(studentId))
    } else throw new Error("Failed to follow: " + response.statusText)
  }
)
