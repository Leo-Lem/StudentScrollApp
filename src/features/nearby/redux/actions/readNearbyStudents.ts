import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"

import { addLocation } from ".."
import StudentLocation from "../../types/StudentLocation"
import { Profile } from "../../../profiles"

export default createAsyncThunk(
  "nearby/readNearbyStudents",
  async (location: StudentLocation, thunkAPI) => {
    const result: APIResult<Profile[]> = await API.get(
      thunkAPI,
      `students?lat=${location.latitude}&lng=${location.longitude}`
    )

    if (result.ok) {
      result.value.forEach((profile) => {
        if (profile.location !== undefined)
          thunkAPI.dispatch(
            addLocation({ studentId: profile.studentId, location: profile.location })
          )
      })
    } else console.error(result.error)
  }
)
