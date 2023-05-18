import { createAsyncThunk } from "@reduxjs/toolkit"
import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../../redux"

export default createAsyncThunk("nearby/saveLocation", async (thunkAPI) => {
  const studentId = tryGettingStudentId(thunkAPI)

  const response = await fetch(`/api/v1/student/${studentId}/profile}`, {
    method: "PUT",
    headers: {
      Authorization: tryGettingAuthorizationHeader(thunkAPI),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      newLocation: null
    })
  })

  if (!response.ok)
    console.log("Failed to save location: " + response.status + " " + response.statusText)
})
