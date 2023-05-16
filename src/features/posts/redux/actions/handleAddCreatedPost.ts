import { PayloadAction } from "@reduxjs/toolkit"

import ContentPost from "../../types/ContentPost"
import State from "../state"

export default function handleAddCreatedPost(state: State, action: PayloadAction<ContentPost>) {
  if (state.posts === undefined) state.posts = []

  if (state.newestFirst) state.posts.unshift(action.payload)
  else state.posts.push(action.payload)
}