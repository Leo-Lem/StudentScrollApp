import { createAsyncThunk } from "@reduxjs/toolkit"

import API from "../../../../lib/API"
import { setLocation } from "../slice"
import loadStudent from "../../../student/actions/loadStudent"

export default createAsyncThunk("nearby/saveLocation", async (_, thunkAPI) => {
  thunkAPI.dispatch(setLocation(undefined))

  const result = await API.put(thunkAPI, "students", {
    newLocation: null
  })

  if (result.ok) thunkAPI.dispatch(loadStudent())
  else console.error(result.error)
})
