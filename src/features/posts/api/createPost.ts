import { createAsyncThunk } from "@reduxjs/toolkit";

import ContentPost from "../types/ContentPost";
import tryGettingAuthorizationHeader from "../../authentication/derived/tryGettingAuthorizationHeader";
import tryGettingStudentId from "../../authentication/derived/tryGettingStudentId";

export default createAsyncThunk(
  "posts/createPost",
  async (
    info: { title: string; tags: string[]; content: string },
    thunkAPI
  ): Promise<ContentPost> => {
    const response = await fetch("/api/v1/posts", {
      method: "POST",
      headers: {
        Authorization: tryGettingAuthorizationHeader(thunkAPI),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...info, posterId: tryGettingStudentId(thunkAPI) })
    })

    if (response.ok) return (await response.json()) as ContentPost
    else throw new Error("Failed to create post: " + response.statusText)
  }
)
