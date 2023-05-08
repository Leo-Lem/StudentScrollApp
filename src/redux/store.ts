import { configureStore } from '@reduxjs/toolkit'
import auth from './auth'

const store = configureStore({
  reducer: {
    auth: auth
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch