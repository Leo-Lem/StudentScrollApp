import { createAsyncThunk } from "@reduxjs/toolkit"

import API from "../../../../lib/API"
import { removePost } from "../slice"

export default createAsyncThunk("posts/deletePost", async (postId: number, thunkAPI) => {
  const result = await API.del(thunkAPI, `posts/${postId}`)

  if (result.ok) thunkAPI.dispatch(removePost(postId))
  else console.error(result.error.message)
})
