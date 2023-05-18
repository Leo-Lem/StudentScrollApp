import { PayloadAction } from "@reduxjs/toolkit"

import ContentPost from "../../types/ContentPost"
import State from "../state"

export default function handleAddStudentPosts(
  state: State,
  action: PayloadAction<{ posterId: number; posts: ContentPost[] }>
) {
  const id = action.payload.posterId

  if (state.studentPosts[id] === undefined) state.studentPosts[id] = []

  const filteredPosts = state.studentPosts[id].filter(
    (existingPost) => !action.payload.posts.some((newPost) => newPost.id === existingPost.id)
  )

  state.studentPosts[id] = [...filteredPosts, ...action.payload.posts]
}
