import { createAsyncThunk } from "@reduxjs/toolkit"
import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../../redux"
import StudentLocation from "../../types/Location"

export default createAsyncThunk(
  "nearby/saveLocation",
  async (location: StudentLocation, thunkAPI) => {
    const studentId = tryGettingStudentId(thunkAPI)

    const response = await fetch(`/api/v1/student/${studentId}/profile}`, {
      method: "PUT",
      headers: {
        Authorization: tryGettingAuthorizationHeader(thunkAPI),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        newLocation: location
      })
    })

    if (!response.ok)
      console.log("Failed to save location: " + response.status + " " + response.statusText)
  }
)
