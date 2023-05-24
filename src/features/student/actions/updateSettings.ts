import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../lib/API"

import { Settings } from "../../settings"
import { setSettings } from "../slice"

export default createAsyncThunk(
  "student/updateSettings",
  async (info: { newTheme?: string; newLocale?: string }, thunkAPI) => {
    const result: APIResult<Settings> = await API.put(thunkAPI, "account/settings", info)

    if (result.ok) thunkAPI.dispatch(setSettings(result.value))
    else console.error(result.error.message)
  }
)
