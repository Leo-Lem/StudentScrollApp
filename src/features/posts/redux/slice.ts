import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"

import handleToggleNewestFirst from "./actions/handleToggleNewestFirst"
import handleAddCreatedPost from "./actions/handleAddCreatedPost"
import handleAddPosts from "./actions/handleAddPosts"
import handleRemovePost from "./actions/handleRemovePost"
import handleAddStudentPosts from "./actions/handleAddStudentPosts"

const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleNewestFirst: handleToggleNewestFirst,
    addCreatedPost: handleAddCreatedPost,
    addPosts: handleAddPosts,
    removePost: handleRemovePost,
    addStudentPosts: handleAddStudentPosts
  }
})

export default posts
