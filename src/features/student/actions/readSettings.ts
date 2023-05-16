import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../redux"
import { setSettings } from ".."
import { Settings } from "../../settings"

export default createAsyncThunk(
  "student/readSettings",
  async (_, thunkAPI) => {
    const studentId = tryGettingStudentId(thunkAPI)

    const response = await fetch(`/api/v1/students/${studentId}/settings`, {
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (response.ok) thunkAPI.dispatch(setSettings((await response.json()) as Settings))
    else throw new Error("Failed to read settings: " + response.statusText)
  }
)
