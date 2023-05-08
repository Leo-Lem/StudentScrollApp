import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import type ContentPost from "./types/ContentPost"
import tryGettingAuthorizationHeader from "../authentication/derived/tryGettingAuthorizationHeader"
import tryGettingStudentId from "../authentication/derived/tryGettingStudentId"
import { type RootState } from "../../app/store"

export interface PostsState {
  posts?: ContentPost[]
  newestFirst: boolean
}

const initialState: PostsState = { newestFirst: true }

const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleNewestFirst: (state) => {
      state.newestFirst = !state.newestFirst
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        if (state.posts === undefined) state.posts = []
        if (state.newestFirst) state.posts.unshift(action.payload)
        else state.posts.push(action.payload)
      })
      .addCase(readPosts.fulfilled, (state, action) => {
        state.posts = action.payload
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (state.posts !== undefined)
          state.posts = state.posts.filter((post) => post.id !== action.payload)
      })
  }
})

export const createPost = createAsyncThunk(
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

export const readPosts = createAsyncThunk(
  "posts/readPosts",
  async (page: number, thunkAPI): Promise<ContentPost[]> => {
    const state = thunkAPI.getState() as RootState

    const response = await fetch(
      `/api/v1/posts?page=${page}&size=10&sort=timestamp&sortAscending=${JSON.stringify(!state.posts.newestFirst)}`,
      {
        method: "GET",
        headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
      }
    )

    if (response.ok) return (await response.json()) as ContentPost[]
    else throw new Error("Failed to read posts: " + response.statusText)
  }
)

export const deletePost = createAsyncThunk(
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

export const { toggleNewestFirst } = posts.actions

export default posts.reducer
