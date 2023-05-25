import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"

import handleRemovePost from "./reducers/handleRemovePost"
import handleAddPosts from "./reducers/handleAddPosts"

const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts: handleAddPosts,
    removePost: handleRemovePost
  }
})

export default posts
export const { addPosts, removePost } = posts.actions
