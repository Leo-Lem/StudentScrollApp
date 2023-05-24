import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../lib/API"

import { Settings } from "../../settings"
import { setSettings } from "../slice"

export default createAsyncThunk("student/readSettings", async (_, thunkAPI) => {
  const result: APIResult<Settings> = await API.get(thunkAPI, "account/settings")

  if (result.ok) thunkAPI.dispatch(setSettings(result.value))
  else console.error(result.error.message)
})
