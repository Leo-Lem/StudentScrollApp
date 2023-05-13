import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../redux"
import Settings from "../types/Settings"

export default createAsyncThunk(
  "settings/read",
  async (id: number | undefined, thunkAPI): Promise<Settings> => {
    const unwrappedId = id ?? tryGettingStudentId(thunkAPI)

    const response = await fetch(`/api/v1/students/${unwrappedId}/settings`, {
      method: "GET",
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (response.ok) return (await response.json()) as Settings
    else throw new Error("Failed to read settings: " + response.statusText)
  }
)
