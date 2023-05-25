import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContentPost } from "../../../posts"
import API, { APIResult } from "../../../../lib/API"

import { addSearchResult } from "../slice"

export default createAsyncThunk("search/readPostByTags", async (tag: string, thunkAPI) => {
  const result: APIResult<ContentPost[]> = await API.get(thunkAPI, `posts?tags=${tag}`)

  if (result.ok) {
    for (const post of result.value) {
      thunkAPI.dispatch(addSearchResult({ query: tag, result: { id: "post", value: post } }))
    }
  } else console.error(result.error.message)
})
