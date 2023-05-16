import { createAsyncThunk } from "@reduxjs/toolkit"

import { addProfile } from ".."
import { tryGettingAuthorizationHeader } from "../../../../redux"
import Profile from "../../types/Profile"

export default createAsyncThunk(
  "profile/readProfile",
  async (studentId: number, thunkAPI) => {
    const response = await fetch(`/api/v1/students/${studentId}/profile`, {
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (response.ok) thunkAPI.dispatch(addProfile({ studentId, profile: (await response.json()) as Profile }))
    else throw new Error("Failed to read profile: " + response.statusText)
  }
)
