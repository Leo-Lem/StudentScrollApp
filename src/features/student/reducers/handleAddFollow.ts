import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"

export default function handleAddFollow(state: State, action: PayloadAction<number>) {
  if (state.profile !== undefined && !state.profile.follows.includes(action.payload))
    state.profile.follows.push(action.payload)
}
