import { configureStore } from "@reduxjs/toolkit"

import authentication from "../features/authentication/authenticationReducer"
import { postsReducer } from "../features/posts"
import { profileReducer } from "../features/profiles"
import { settingsReducer } from "../features/settings"

const store = configureStore({
  reducer: {
    authentication,
    posts: postsReducer,
    profiles: profileReducer,
    settings: settingsReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
