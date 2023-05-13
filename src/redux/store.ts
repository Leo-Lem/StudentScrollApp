import { configureStore } from "@reduxjs/toolkit"

import authentication from "../features/authentication/authenticationReducer"
import { postsReducer } from "../features/posts"
import { profileReducer } from "../features/profiles"

const store = configureStore({
  reducer: {
    authentication,
    posts: postsReducer,
    profiles: profileReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
