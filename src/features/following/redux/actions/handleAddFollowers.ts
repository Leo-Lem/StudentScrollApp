import { PayloadAction } from "@reduxjs/toolkit"

import { State } from "../state"

export default function handleAddFollowers(state: State, action: PayloadAction<{ id: number, followers: number[] }>) {
  const id = action.payload.id

  if (state[id] === undefined) state[id] = { followers: [] }
  state[id].followers?.push(...action.payload.followers)
}