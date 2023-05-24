import { createAsyncThunk } from "@reduxjs/toolkit"

import API from "../../../../lib/API"

import StudentLocation from "../../types/StudentLocation"
import { setLocation } from "../slice"
import loadStudent from "../../../student/actions/loadStudent"

export default createAsyncThunk(
  "nearby/saveLocation",
  async (location: StudentLocation, thunkAPI) => {
    thunkAPI.dispatch(setLocation(location))

    const result = await API.put(thunkAPI, "students", {
      newLocation: location
    })

    if (result.ok) thunkAPI.dispatch(loadStudent())
    else console.error(result.error)
  }
)
