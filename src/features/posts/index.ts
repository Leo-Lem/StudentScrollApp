import { createSlice } from "@reduxjs/toolkit"

import type ContentPost from "./types/ContentPost"
import { createPost, readPosts, deletePost } from "./api"

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
        state.posts.push(action.payload)
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

export { createPost, readPosts, deletePost }
export const { toggleNewestFirst } = posts.actions

export default posts.reducer
