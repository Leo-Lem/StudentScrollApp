import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import follow from "./api/follow"
import unfollow from "./api/unfollow"
import readFollowers from "./api/readFollowers"
import readFollows from "./api/readFollows"

export interface FollowingState {
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
        const studentId = action.payload.studentId
        const followId = action.payload.followId

        if (state[studentId] === undefined) state[studentId] = {}
        state[studentId].follows = [...(state[studentId]?.follows ?? []), followId]
      })
      .addCase(unfollow.fulfilled, (state, action: PayloadAction<{ studentId: number, followId: number }>) => {
        const studentId = action.payload.studentId
        const followId = action.payload.followId

        if (state[studentId] === undefined) state[studentId] = {}
        state[studentId].follows = state[studentId]?.follows?.filter((id) => id !== followId) ?? []
      })
      .addCase(readFollowers.fulfilled, (state, action: PayloadAction<{ studentId: number, followers: number[] }>) => {
        const studentId = action.payload.studentId
        const followers = action.payload.followers

        if (state[studentId] === undefined) state[studentId] = {}
        state[studentId].followers = followers
      })
      .addCase(readFollows.fulfilled, (state, action: PayloadAction<{ studentId: number, follows: number[] }>) => {
        const studentId = action.payload.studentId
        const follows = action.payload.follows

        if (state[studentId] === undefined) state[studentId] = {}
        state[studentId].follows = follows
      })
  }
})

export default following.reducer
export { follow, unfollow, readFollowers, readFollows }
