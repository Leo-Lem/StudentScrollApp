import { createSlice } from "@reduxjs/toolkit"

import ContentPost from "./types/ContentPost"
import createPost from "./api/createPost"
import readPosts from "./api/readPosts"
import deletePost from "./api/deletePost"

export interface PostsState {
  posts?: ContentPost[]
  newestFirst: boolean
  pageSize: number
  nextPage: number | undefined
}

const posts = createSlice({
  name: "posts",
  initialState: { newestFirst: true, pageSize: 10, nextPage: 0 } as PostsState,
  reducers: {
    resetPosts: (state) => {
      state.posts = undefined
      state.nextPage = 0
    },
    toggleNewestFirst: (state) => {
      state.newestFirst = !state.newestFirst
      state.nextPage = 0
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
        if (state.posts === undefined) state.posts = []
        state.posts.push(...action.payload.posts)
        state.posts = state.posts.filter(
          (post, i, posts) => posts.findIndex((post2) => post2.id === post.id) === i
        )
        state.nextPage = action.payload.nextPage
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
