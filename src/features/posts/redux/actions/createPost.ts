import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingStudentId } from "../../../../lib/redux"
import API, { APIResult } from "../../../../lib/API"

import { addCreatedPost } from ".."
import ContentPost from "../../types/ContentPost"

export default createAsyncThunk(
  "posts/createPost",
  async (info: { title: string; tags: string[]; content: string }, thunkAPI) => {
    const result: APIResult<ContentPost> = await API.post(thunkAPI, "posts", info)

    if (result.ok) thunkAPI.dispatch(addCreatedPost(result.value))
    else console.error(result.error.message)
  }
)
