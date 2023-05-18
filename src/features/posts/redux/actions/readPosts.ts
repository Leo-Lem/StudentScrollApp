import { createAsyncThunk } from "@reduxjs/toolkit"

import { RootState } from "../../../../redux"
import API from "../../../../lib/API"
import Result from "../../../../lib/Result"

import { addPosts } from ".."
import ContentPost from "../../types/ContentPost"

export default createAsyncThunk("posts/readPosts", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState

  const { nextPage, pageSize } = state.posts

  if (nextPage === undefined) return

  const result: Result<ContentPost[], API.Error> = await API.get(thunkAPI, `posts?page=${nextPage}&size=${pageSize}&sort=timestamp`)

  // TODO: verify this works reasonably well without the headers
  if (result.ok) {
    thunkAPI.dispatch(addPosts({
      posts: result.value,
      nextPage: result.value.length < pageSize ? undefined : nextPage + 1
    }))
  } else console.log(result.error.message)
})
