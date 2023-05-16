import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"

import handleToggleNewestFirst from "./actions/handleToggleNewestFirst"
import handleAddCreatedPost from "./actions/handleAddCreatedPost"
import handleAddPosts from "./actions/handleAddPosts"
import handleRemovePost from "./actions/handleRemovePost"

const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleNewestFirst: handleToggleNewestFirst,
    addCreatedPost: handleAddCreatedPost,
    addPosts: handleAddPosts,
    removePost: handleRemovePost
  }
})

export default posts