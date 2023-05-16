
import { createSlice } from "@reduxjs/toolkit"

import { Profile } from "../profiles"
import { Settings } from "../settings"
import { setAuthenticated } from "../authentication/redux"

interface StudentState {
  id: number
  profile?: Profile
  followers?: number[]
  follows?: number[]
  settings?: Settings
}

const student = createSlice({
  name: "student",
  initialState: null as StudentState | null,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(setAuthenticated, (student, action) => {
        if (student === null) student = { id: action.payload.studentId }
        else student.id = action.payload.studentId
      })
  }
})

export default student.reducer