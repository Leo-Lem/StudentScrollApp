import { createAsyncThunk } from "@reduxjs/toolkit"

import API from "../../../../lib/API"

import StudentLocation from "../../types/StudentLocation"

export default createAsyncThunk(
  "nearby/saveLocation",
  async (location: StudentLocation, thunkAPI) => {
    const result = await API.put(thunkAPI, "students", {
      newLocation: location
    })

    if (!result.ok) console.error(result.error)
  }
)
