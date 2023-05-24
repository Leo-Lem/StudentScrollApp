import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"

export default function handleAddFollow(state: State, action: PayloadAction<number>) {
  state.profile?.follows.push(action.payload)
}
