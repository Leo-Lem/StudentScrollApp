import { PayloadAction } from "@reduxjs/toolkit"

import { State } from "../state"

export default function handleRemoveFollowers(state: State, action: PayloadAction<{ id: number, followers: number[] }>) {
  state[action.payload.id]?.followers?.filter((id) => !action.payload.followers.includes(id))
}