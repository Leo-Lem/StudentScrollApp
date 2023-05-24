import { createAsyncThunk } from "@reduxjs/toolkit"

import API from "../../../../lib/API"
import { setLocation } from "../slice"

export default createAsyncThunk("nearby/saveLocation", async (_, thunkAPI) => {
  thunkAPI.dispatch(setLocation(undefined))

  const result = await API.put(thunkAPI, "students", {
    newLocation: null
  })

  if (!result.ok) console.error(result.error)
})
