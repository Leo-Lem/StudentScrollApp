import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"

import { addStudentPosts } from ".."
import ContentPost from "../../types/ContentPost"

export default createAsyncThunk("posts/readPosts", async (posterId: number, thunkAPI) => {
  const result: APIResult<ContentPost[]> = await API.get(thunkAPI, `posts?posterIds=${posterId}`)

  if (result.ok) thunkAPI.dispatch(addStudentPosts({ posterId, posts: result.value }))
  else console.error(result.error.message)
})
