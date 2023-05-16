import { PayloadAction } from "@reduxjs/toolkit"

import { State } from "../state"

export default function handleRemoveFollows(state: State, action: PayloadAction<{ id: number, follows: number[] }>) {
  state[action.payload.id]?.follows?.filter((id) => !action.payload.follows.includes(id))
}