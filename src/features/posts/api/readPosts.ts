import { createAsyncThunk } from "@reduxjs/toolkit"

import { RootState, tryGettingAuthorizationHeader } from "../../../redux"
import ContentPost from "../types/ContentPost"

export default createAsyncThunk(
  "posts/readPosts",
  async (_, thunkAPI): Promise<{ posts: ContentPost[]; nextPage?: number }> => {
    const state = thunkAPI.getState() as RootState

    const page = state.posts.nextPage
    const pageSize = state.posts.pageSize

    if (page === undefined) throw new Error("No more posts to read")

    const response = await fetch(
      `/api/v1/posts?page=${page}&size=${pageSize}&sort=timestamp&sortAscending=${JSON.stringify(
        !state.posts.newestFirst
      )}`,
      {
        method: "GET",
        headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
      }
    )

    if (response.ok) {
      const posts = (await response.json()) as ContentPost[]
      const totalHeader = response.headers.get("X-Total-Count")
      if (totalHeader === null) return { posts, nextPage: undefined }
      const nextPage = parseInt(totalHeader) > (page + 1) * pageSize ? page + 1 : undefined

      return { posts, nextPage }
    } else throw new Error("Failed to read posts: " + response.statusText)
  }
)
