import { configureStore } from "@reduxjs/toolkit"

import studentReducer from "./features/student"
import { authenticationReducer } from "./features/authentication"
import { postsReducer } from "./features/posts"
import { profileReducer } from "./features/profiles"
import { chatsReducer } from "./features/chats"
import { nearbyReducer } from "./features/nearby"
import { searchReducer } from "./features/search"

const store = configureStore({
  reducer: {
    student: studentReducer,
    authentication: authenticationReducer,
    posts: postsReducer,
    chats: chatsReducer,
    profiles: profileReducer,
    nearby: nearbyReducer,
    search: searchReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
