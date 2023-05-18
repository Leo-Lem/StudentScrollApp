import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../redux"
import { setSettings } from ".."
import { Settings } from "../../settings"
import Result from "../../../lib/Result"
import API from "../../../lib/API"

export default createAsyncThunk("student/readSettings", async (_, thunkAPI) => {
  const result: Result<Settings, API.Error> = await API.get(
    thunkAPI,
    `students/${tryGettingStudentId(thunkAPI)}/settings`
  )

  if (result.ok) thunkAPI.dispatch(setSettings(result.value))
  else console.error(result.error.message)
})
