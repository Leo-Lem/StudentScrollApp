import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"

export default function handleRemovePost(state: State, action: PayloadAction<number>) {
  state.posts = state.posts.filter((p) => p.id !== action.payload)
}
