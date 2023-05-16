import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../../redux"
import Settings from "../../types/Settings"
import { setSettings } from ".."

export default createAsyncThunk(
  "settings/read",
  async (_, thunkAPI) => {
    const studentId = tryGettingStudentId(thunkAPI)

    const response = await fetch(`/api/v1/students/${studentId}/settings`, {
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (response.ok) thunkAPI.dispatch(setSettings((await response.json()) as Settings))
    else throw new Error("Failed to read settings: " + response.statusText)
  }
)
