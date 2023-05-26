import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"

import { setAPIKey } from "../slice"

export default createAsyncThunk("nearby/getAPIKey", async (_, thunkAPI) => {
  const result: APIResult<{ apiKey: string }> = await API.get(thunkAPI, "maps")

  if (result.ok) thunkAPI.dispatch(setAPIKey(result.value.apiKey))
  else console.error(result.error)
})
