import { configureStore } from "@reduxjs/toolkit"

import authentication from "../features/authentication"
import posts from "../features/posts"

const store = configureStore({
  reducer: {
    authentication,
    posts
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
