import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import follow from "./api/follow"
import unfollow from "./api/unfollow"
import readFollowers from "./api/readFollowers"
import readFollowersOf from "./api/readFollowersOf"
import readFollows from "./api/readFollows"
import readFollowsOf from "./api/readFollowsOf"

export interface FollowingState {
  follows?: number[]
  followers?: number[]
  [studentId: number]: {
    follows?: number[]
    followers?: number[]
  }
}

const following = createSlice({
  name: "following",
  initialState: {} as FollowingState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(follow.fulfilled, (state, action: PayloadAction<{ studentId: number, followId: number }>) => {
        if (state.follows === undefined) state.follows = []
        if (state.followers === undefined) state.followers = []

        state.follows.push(action.payload.followId)
      })
      .addCase(unfollow.fulfilled, (state, action: PayloadAction<{ studentId: number, followId: number }>) => {
        if (state.follows === undefined) state.follows = []
        if (state.followers === undefined) state.followers = []

        state.follows = state.follows.filter((followId) => followId !== action.payload.followId)
      })
      .addCase(readFollowers.fulfilled, (state, action: PayloadAction<number[]>) => {
        state.followers = action.payload
      })
      .addCase(readFollows.fulfilled, (state, action: PayloadAction<number[]>) => {
        state.follows = action.payload
      })
      .addCase(readFollowersOf.fulfilled, (state, action: PayloadAction<{ studentId: number, followers: number[] }>) => {
        if (state[action.payload.studentId] === undefined) state[action.payload.studentId] = {}
        state[action.payload.studentId].follows = action.payload.followers
      })
      .addCase(readFollowsOf.fulfilled, (state, action: PayloadAction<{ studentId: number, follows: number[] }>) => {
        if (state[action.payload.studentId] === undefined) state[action.payload.studentId] = {}
        state[action.payload.studentId].follows = action.payload.follows
      })
  }
})

export default following.reducer
export { follow, unfollow, readFollowers, readFollows, readFollowersOf, readFollowsOf }
