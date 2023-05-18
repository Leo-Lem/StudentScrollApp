import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader } from "../../../../redux"
import ContentPost from "../../types/ContentPost"
import { addStudentPosts } from ".."

export default createAsyncThunk("posts/readPosts", async (posterId: number, thunkAPI) => {
  const response = await fetch(`/api/v1/posts?posterIds=${posterId}}`, {
    headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
  })

  if (response.ok) thunkAPI.dispatch(addStudentPosts({ posterId, posts: await response.json() as ContentPost[] }))
  else throw new Error("Failed to read posts: " + response.statusText)
})
