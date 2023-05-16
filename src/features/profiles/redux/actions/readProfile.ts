import { createAsyncThunk } from "@reduxjs/toolkit"

import { addProfile } from ".."
import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../../redux"
import Profile from "../../types/Profile"

export default createAsyncThunk(
  "profile/readProfile",
  async (studentId: number | undefined, thunkAPI) => {
    const id = studentId ?? tryGettingStudentId(thunkAPI)

    const response = await fetch(`/api/v1/students/${id}/profile`, {
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (response.ok) thunkAPI.dispatch(addProfile({ studentId: id, profile: (await response.json()) as Profile }))
    else throw new Error("Failed to read profile: " + response.statusText)
  }
)
