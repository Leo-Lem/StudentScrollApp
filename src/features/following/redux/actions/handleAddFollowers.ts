import { PayloadAction } from "@reduxjs/toolkit"

import { State } from "../state"

export default function handleAddFollowers(state: State, action: PayloadAction<{ id: number, followers: number[] }>) {
  const id = action.payload.id

  if (state[id] === undefined) state[id] = { followers: [] }

  const followers = action.payload.followers.filter(follower => !state[id].followers?.includes(follower));

  state[id].followers?.push(...followers)
}