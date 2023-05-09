import { configureStore } from "@reduxjs/toolkit"

import authentication from "../features/authentication"
import posts from "../features/posts"
import profiles from "../features/profiles"

const store = configureStore({
  reducer: {
    authentication,
    posts,
    profiles
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
