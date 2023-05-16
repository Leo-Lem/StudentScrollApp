import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingStudentId } from "../../../redux"
import { readProfile } from "../../profiles/redux"
import { readFollowers, readFollows } from "../../following/redux"
import readSettings from "./readSettings"

export default createAsyncThunk(
  "student/load",
  async (_, thunkAPI) => {
    const studentId = tryGettingStudentId(thunkAPI)

    thunkAPI.dispatch(readSettings())
    thunkAPI.dispatch(readProfile(studentId))
    thunkAPI.dispatch(readFollowers(studentId))
    thunkAPI.dispatch(readFollows(studentId))
  }
)