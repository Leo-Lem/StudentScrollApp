import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"

export default function handleRemoveFollow(state: State, action: PayloadAction<number>) {
  const index = state.profile?.follows.indexOf(action.payload) ?? -1

  if (index !== -1) state.profile?.follows.slice(index, 1)
}
