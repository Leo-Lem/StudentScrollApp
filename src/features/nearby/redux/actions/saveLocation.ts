import { createAsyncThunk } from "@reduxjs/toolkit"

import API from "../../../../lib/API"

import StudentLocation from "../../types/StudentLocation"
import { setLocation } from "../slice"

export default createAsyncThunk(
  "nearby/saveLocation",
  async (location: StudentLocation, thunkAPI) => {
    thunkAPI.dispatch(setLocation(location))

    const result = await API.put(thunkAPI, "students", {
      newLocation: location
    })

    if (!result.ok) console.error(result.error)
  }
)
