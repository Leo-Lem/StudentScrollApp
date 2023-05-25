import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"
import { tryGettingStudentId } from "../../../../lib/redux"
import { Profile } from "../../../profiles"


export default createAsyncThunk(
  "search/readProfileByName",
  async (name: string, thunkAPI) => {
    
    const result: APIResult<Profile[]> = await API.get(thunkAPI, `students?name=${name}`)

    if (result.ok) {

    } else console.error(result.error.message)
  }
)
