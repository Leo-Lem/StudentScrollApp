import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader } from "../../../redux"

export default createAsyncThunk(
  "posts/deletePost",
  async (postId: number, thunkAPI): Promise<number | undefined> => {
    const response = await fetch(`/api/v1/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: tryGettingAuthorizationHeader(thunkAPI),
        "Content-Type": "application/json"
      }
    })

    if (response.ok) return postId
  }
)