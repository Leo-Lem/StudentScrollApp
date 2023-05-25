import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"

import ContentPost from "../../types/ContentPost"
import { addPosts } from "../slice"

export default createAsyncThunk(
  "posts/createPost",
  async (post: Partial<ContentPost>, thunkAPI) => {
    const result: APIResult<ContentPost> = await API.post(thunkAPI, "posts", post)

    if (result.ok) thunkAPI.dispatch(addPosts([result.value]))
    else console.error(result.error.message)
  }
)
