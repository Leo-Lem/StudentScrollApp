import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingStudentId } from "../../../lib/redux"

import readSettings from "./readSettings"
import readProfile from "../../profiles/redux/actions/readProfile"

export default createAsyncThunk("student/load", async (_, thunkAPI) => {
  const studentId = tryGettingStudentId(thunkAPI)

  thunkAPI.dispatch(readSettings())
  thunkAPI.dispatch(readProfile(studentId))
})
