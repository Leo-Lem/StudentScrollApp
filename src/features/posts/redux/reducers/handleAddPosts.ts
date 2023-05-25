import { PayloadAction } from "@reduxjs/toolkit"

import ContentPost from "../../types/ContentPost"
import State from "../state"

export default function handleAddPosts(state: State, action: PayloadAction<ContentPost[]>) {
  state.posts = [
    ...state.posts.filter((post) => !action.payload.find((newPost) => newPost.id === post.id)),
    ...action.payload
  ]
}
