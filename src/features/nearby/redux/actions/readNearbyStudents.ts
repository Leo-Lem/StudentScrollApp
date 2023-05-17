import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState, tryGettingAuthorizationHeader } from "../../../../redux"

import StudentLocation from "../../types/Location"
import { readProfile } from "../../../profiles/redux"

export default createAsyncThunk(
  "nearby/readNearbyStudents",
  async (location: StudentLocation, thunkAPI) => {
    const response = await fetch(`/api/v1/students?lat=${location.lat}&lng=${location.lng}}`, {
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (response.ok) {
      ;((await response.json()) as number[]).forEach((studentId) => {
        if ((thunkAPI.getState() as RootState).profiles[studentId] === undefined)
          thunkAPI.dispatch(readProfile(studentId))
      })
    } else console.error("Failed to save location: " + response.status + " " + response.statusText)
  }
)
