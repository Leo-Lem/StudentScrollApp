import { PayloadAction } from "@reduxjs/toolkit"

import { State } from "../state"

export default function handleAddFollows(state: State, action: PayloadAction<{ studentId: number, follows: number[] }>) {
  const studentId = action.payload.studentId

  if (state[studentId] === undefined) state[studentId] = { follows: [], followers: [] }

  const follows = action.payload.follows.filter(follow => !state[studentId].follows?.includes(follow))

  state[studentId].follows?.push(...follows)
}
