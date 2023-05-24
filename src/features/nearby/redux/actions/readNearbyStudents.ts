import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"

import StudentLocation from "../../types/StudentLocation"
import { Profile } from "../../../profiles"
import { addProfile } from "../../../profiles/redux/slice"

export default createAsyncThunk(
  "nearby/readNearbyStudents",
  async (location: StudentLocation, thunkAPI) => {
    const result: APIResult<Profile[]> = await API.get(
      thunkAPI,
      `students?lat=${location.latitude}&lng=${location.longitude}`
    )

    if (result.ok) result.value.forEach((profile) => thunkAPI.dispatch(addProfile(profile)))
    else console.error(result.error)
  }
)
