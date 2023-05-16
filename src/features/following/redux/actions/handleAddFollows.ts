import { PayloadAction } from "@reduxjs/toolkit"

import { State } from "../state"

export default function handleAddFollows(state: State, action: PayloadAction<{ id: number, follows: number[] }>) {
  const id = action.payload.id

  if (state[id] === undefined) state[id] = { follows: [] }
  state[id].follows?.push(...action.payload.follows)
}
