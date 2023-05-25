import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"

import ContentPost from "../../types/ContentPost"
import { addPosts } from "../slice"

export default createAsyncThunk("posts/readPostsByPosterId", async (posterId: number, thunkAPI) => {
  const result: APIResult<ContentPost[]> = await API.get(thunkAPI, `posts?posterIds=${posterId}`)

  if (result.ok) thunkAPI.dispatch(addPosts(result.value))
  else console.error(result.error.message)
})
