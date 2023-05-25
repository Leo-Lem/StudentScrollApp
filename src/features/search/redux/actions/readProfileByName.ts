import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"
import { Profile } from "../../../profiles"
import { addSearchResult } from "../slice"
import { addProfile } from "../../../profiles/redux/slice"

export default createAsyncThunk("search/readProfileByName", async (name: string, thunkAPI) => {
  const result: APIResult<Profile[]> = await API.get(thunkAPI, `students?name=${name}`)

  if (result.ok) {
    for (const profile of result.value) {
      thunkAPI.dispatch(addProfile(profile))
      thunkAPI.dispatch(
        addSearchResult({ query: name, result: { id: "profileByName", value: profile } })
      )
    }
  } else console.error(result.error.message)
})
