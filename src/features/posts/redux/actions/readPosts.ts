import { createAsyncThunk } from "@reduxjs/toolkit"

import { RootState } from "../../../../store"
import API, { APIResult } from "../../../../lib/API"

import { addPosts } from ".."
import ContentPost from "../../types/ContentPost"

export default createAsyncThunk("posts/readPosts", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState

  const { nextPage, pageSize, newestFirst } = state.posts

  if (nextPage === undefined) return

  const result: APIResult<ContentPost[]> = await API.get(
    thunkAPI,
    `posts?page=${nextPage}&size=${pageSize}&sort=timestamp&sortAscending=${JSON.stringify(
      !newestFirst
    )}`
  )

  if (result.ok) {
    thunkAPI.dispatch(
      addPosts({
        posts: result.value,
        nextPage: result.value.length < pageSize ? undefined : nextPage + 1
      })
    )
  } else console.error(result.error.message)
})
