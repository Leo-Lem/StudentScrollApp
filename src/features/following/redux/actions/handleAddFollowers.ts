import { PayloadAction } from "@reduxjs/toolkit"

import { State } from "../state"

export default function handleAddFollowers(state: State, action: PayloadAction<{ studentId: number, followers: number[] }>) {
  const studentId = action.payload.studentId

  if (state[studentId] === undefined) state[studentId] = { follows: [], followers: [] }

  const followers = action.payload.followers.filter(follower => !state[studentId].followers?.includes(follower))

  state[studentId].followers?.push(...followers)
}