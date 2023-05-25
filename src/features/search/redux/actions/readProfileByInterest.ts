import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"
import { Profile } from "../../../profiles"
import { addSearchResult } from "../slice"
import { addProfile } from "../../../profiles/redux/slice"

export default createAsyncThunk(
  "search/readProfileByInterest",
  async (interest: string, thunkAPI) => {
    const result: APIResult<Profile[]> = await API.get(thunkAPI, `students?interests=${interest}`)

    if (result.ok) {
      for (const profile of result.value) {
        thunkAPI.dispatch(addProfile(profile))
        thunkAPI.dispatch(
          addSearchResult({ query: interest, result: { id: "profile", value: profile } })
        )
      }
    } else console.error(result.error.message)
  }
)
