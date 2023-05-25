import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContentPost } from "../../../posts"
import API, { APIResult } from "../../../../lib/API"

import { addSearchResult } from "../slice"

export default createAsyncThunk("search/readPostByTitle", async (title: string, thunkAPI) => {
  const result: APIResult<ContentPost[]> = await API.get(thunkAPI, `posts?title=${title}`)

  if (result.ok) {
    for (const post of result.value) {
      thunkAPI.dispatch(addSearchResult({ query: title, result: { id: "post", value: post } }))
    }
  } else console.error(result.error.message)
})
