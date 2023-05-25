import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"

import ContentPost from "../../types/ContentPost"
import { addPosts } from "../slice"

export default createAsyncThunk(
  "posts/readPosts",
  async (
    { newestFirst, nextPage }: { newestFirst: boolean; nextPage: number },
    thunkAPI
  ): Promise<number | undefined> => {
    const pageSize = 10

    const result: APIResult<ContentPost[]> = await API.get(
      thunkAPI,
      `posts?page=${nextPage}&size=${pageSize}&sort=timestamp&sortAscending=${JSON.stringify(
        !newestFirst
      )}`
    )

    if (result.ok) {
      thunkAPI.dispatch(addPosts(result.value))
      return result.value.length === pageSize ? nextPage + 1 : undefined
    } else console.error(result.error.message)
  }
)
