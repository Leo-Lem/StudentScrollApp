import { PayloadAction } from "@reduxjs/toolkit"

import { State } from "../state"

export default function handleRemoveFollows(
  state: State,
  action: PayloadAction<{ studentId: number; follows: number[] }>
) {
  if (state[action.payload.studentId].follows !== undefined)
    state[action.payload.studentId].follows = state[action.payload.studentId].follows.filter(
      (id) => !action.payload.follows.includes(id)
    )
}
