import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../../redux"
import Profile from "../../types/Profile"
import { addProfile } from ".."

export default createAsyncThunk(
  "profile/updateProfile",
  async (info: { newName?: string; newBio?: string; newIcon?: string }, thunkAPI) => {
    const studentId = tryGettingStudentId(thunkAPI)

    const response = await fetch(`/api/v1/students/${studentId}/profile`, {
      method: "PUT",
      headers: {
        Authorization: tryGettingAuthorizationHeader(thunkAPI),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    })

    if (response.ok)
      thunkAPI.dispatch(addProfile({ studentId, profile: (await response.json()) as Profile }))
    else throw new Error("Failed to update profile: " + response.statusText)
  }
)
