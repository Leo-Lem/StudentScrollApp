import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../../redux"

import { addCreatedPost } from ".."
import ContentPost from "../../types/ContentPost"

export default createAsyncThunk(
  "posts/createPost",
  async (info: { title: string; tags: string[]; content: string }, thunkAPI) => {
    const response = await fetch("/api/v1/posts", {
      method: "POST",
      headers: {
        Authorization: tryGettingAuthorizationHeader(thunkAPI),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...info, posterId: tryGettingStudentId(thunkAPI) })
    })

    if (response.ok) thunkAPI.dispatch(addCreatedPost((await response.json()) as ContentPost))
    else throw new Error("Failed to create post: " + response.statusText)
  }
)
