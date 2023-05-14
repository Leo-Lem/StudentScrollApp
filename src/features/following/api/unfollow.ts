import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../redux"

export default createAsyncThunk(
  "profile/unfollow",
  async (followId: number, thunkAPI): Promise<{ studentId: number, followId: number }> => {
    const studentId = tryGettingStudentId(thunkAPI)

    const response = await fetch(`/api/v1/students/${followId}/followers/${studentId}`, {
      method: "DELETE",
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (response.ok && studentId !== undefined) return { studentId, followId }
    else throw new Error("Failed to follow: " + response.statusText)
  }
)
