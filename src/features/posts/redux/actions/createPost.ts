import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingStudentId } from "../../../../redux"
import API from "../../../../lib/API"
import Result from "../../../../lib/Result"

import { addCreatedPost } from ".."
import ContentPost from "../../types/ContentPost"

export default createAsyncThunk(
  "posts/createPost",
  async (info: { title: string; tags: string[]; content: string }, thunkAPI) => {
    const result: Result<ContentPost, API.Error> = await API.post(thunkAPI, "posts", {
      ...info,
      posterId: tryGettingStudentId(thunkAPI)
    })

    if (result.ok) thunkAPI.dispatch(addCreatedPost(result.value))
    else console.error(result.error.message)
  }
)
