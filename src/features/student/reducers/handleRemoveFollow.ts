import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"

export default function handleRemoveFollow(state: State, action: PayloadAction<number>) {
  if (state.profile !== undefined)
    state.profile.follows = state.profile.follows.filter((followId) => followId !== action.payload)
}
