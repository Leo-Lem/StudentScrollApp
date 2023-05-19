import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingStudentId } from "../../../lib/redux"
import API, { APIResult } from "../../../lib/API"

import { setSettings } from ".."
import { Settings } from "../../settings"

export default createAsyncThunk(
  "student/updateSettings",
  async (info: { newTheme?: string; newLocale?: string; newIsLocated?: boolean }, thunkAPI) => {
    const result: APIResult<Settings> = await API.put(
      thunkAPI,
      `students/${tryGettingStudentId(thunkAPI)}/settings`,
      info
    )

    if (result.ok) thunkAPI.dispatch(setSettings(result.value))
    else console.error(result.error.message)
  }
)
