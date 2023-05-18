import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingStudentId } from "../../../redux"
import { setSettings } from ".."
import { Settings } from "../../settings"
import Result from "../../../lib/Result"
import API from "../../../lib/API"

export default createAsyncThunk(
  "student/updateSettings",
  async (info: { newTheme?: string; newLocale?: string; newIsLocated?: boolean }, thunkAPI) => {
    const result: Result<Settings, API.Error> = await API.put(
      thunkAPI,
      `students/${tryGettingStudentId(thunkAPI)}/settings`,
      info
    )

    if (result.ok) thunkAPI.dispatch(setSettings(result.value))
    else console.error(result.error.message)
  }
)
