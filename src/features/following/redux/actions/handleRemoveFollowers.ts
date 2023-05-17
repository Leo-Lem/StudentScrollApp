import { PayloadAction } from "@reduxjs/toolkit"

import { State } from "../state"

export default function handleRemoveFollowers(
  state: State,
  action: PayloadAction<{ studentId: number; followers: number[] }>
) {
  if (state[action.payload.studentId].follows !== undefined)
    state[action.payload.studentId].followers = state[action.payload.studentId]?.followers.filter(
      (id) => !action.payload.followers.includes(id)
    )
}
