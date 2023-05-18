import { PayloadAction } from "@reduxjs/toolkit"

import ContentPost from "../../types/ContentPost"
import State from "../state"

export default function handleAddPosts(
  state: State,
  action: PayloadAction<{ posts: ContentPost[]; nextPage?: number }>
) {
  if (state.posts === undefined) state.posts = []

  const filteredPosts = state.posts.filter(
    (existingPost) => !action.payload.posts.some((newPost) => newPost.id === existingPost.id)
  )

  state.posts = [...filteredPosts, ...action.payload.posts]
  state.nextPage = action.payload.nextPage
}
