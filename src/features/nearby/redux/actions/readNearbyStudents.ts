import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"
import { RootState } from "../../../../store"

import { readProfile } from "../../../profiles/redux"
import StudentLocation from "../../types/StudentLocation"

export default createAsyncThunk(
  "nearby/readNearbyStudents",
  async (location: StudentLocation, thunkAPI) => {
    const result: APIResult<number[]> = await API.get(
      thunkAPI,
      `students?lat=${location.latitude}&lng=${location.longitude}`
    )

    if (result.ok) {
      result.value
        .filter((studentId) => !isNaN(studentId))
        .forEach((studentId) => {
          if ((thunkAPI.getState() as RootState).profiles[studentId] === undefined)
            thunkAPI.dispatch(readProfile(studentId))
        })
    } else console.error(result.error)
  }
)
