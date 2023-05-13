import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../redux"
import Settings from "../types/Settings"

export default createAsyncThunk(
  "settings/update",
  async (
    info: { newTheme?: string, newLocale?: string, newIsLocated?: boolean },
    thunkAPI
  ): Promise<Settings> => {
    const id = tryGettingStudentId(thunkAPI)

    const response = await fetch(`/api/v1/students/${id}/profile`, {
      method: "PUT",
      headers: {
        Authorization: tryGettingAuthorizationHeader(thunkAPI),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    })

    if (response.ok && id !== undefined) return (await response.json()) as Settings
    else throw new Error("Failed to update settings: " + response.statusText)
  }
)
