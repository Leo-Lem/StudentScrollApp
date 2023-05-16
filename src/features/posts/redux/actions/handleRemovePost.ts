import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"

export default function handleRemovePost(state: State, action: PayloadAction<number>) {
  if (state.posts !== undefined)
    state.posts = state.posts.filter((post) => post.id !== action.payload)
}