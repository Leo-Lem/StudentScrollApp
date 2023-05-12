import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader } from "../../../redux"
import ContentPost from "../types/ContentPost"
import { RootState } from "../../../redux"


export default createAsyncThunk(
  "posts/readPosts",
  async (page: number, thunkAPI): Promise<ContentPost[]> => {
    const state = thunkAPI.getState() as RootState

    const response = await fetch(
      `/api/v1/posts?page=${page}&size=10&sort=timestamp&sortAscending=${JSON.stringify(
        !state.posts.newestFirst
      )}`,
      {
        method: "GET",
        headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
      }
    )

    if (response.ok) return (await response.json()) as ContentPost[]
    else throw new Error("Failed to read posts: " + response.statusText)
  }
)