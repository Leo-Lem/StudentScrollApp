import { createSlice } from "@reduxjs/toolkit"

import { type ContentPost } from "./types"
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
    resetPosts: (state) => {
      state.posts = undefined
    },
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

export { createPost, readPosts, deletePost }
export const { resetPosts, toggleNewestFirst } = posts.actions

export default posts.reducer
