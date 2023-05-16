import { configureStore } from "@reduxjs/toolkit"

import studentReducer from "../features/student"
import { authenticationReducer } from "../features/authentication"
import { postsReducer } from "../features/posts"
import { profileReducer } from "../features/profiles"
import { followingReducer } from "../features/following"

const store = configureStore({
  reducer: {
    student: studentReducer,
    authentication: authenticationReducer,
    posts: postsReducer,
    profiles: profileReducer,
    following: followingReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
