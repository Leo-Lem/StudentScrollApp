import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../lib/API"

import { setSettings } from ".."
import { Settings } from "../../settings"

export default createAsyncThunk("student/readSettings", async (_, thunkAPI) => {
  const result: APIResult<Settings> = await API.get(thunkAPI, "settings")

  if (result.ok) thunkAPI.dispatch(setSettings(result.value))
  else console.error(result.error.message)
})
