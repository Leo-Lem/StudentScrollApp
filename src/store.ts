import { configureStore } from "@reduxjs/toolkit"

import studentReducer from "./features/student"
import { authenticationReducer } from "./features/authentication"
import { postsReducer } from "./features/posts"
import { profileReducer } from "./features/profiles"
import { followingReducer } from "./features/following"
import { chatsReducer } from "./features/chats"
import { nearbyReducer } from "./features/nearby"

const store = configureStore({
  reducer: {
    student: studentReducer,
    authentication: authenticationReducer,
    posts: postsReducer,
    chats: chatsReducer,
    profiles: profileReducer,
    following: followingReducer,
    nearby: nearbyReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch