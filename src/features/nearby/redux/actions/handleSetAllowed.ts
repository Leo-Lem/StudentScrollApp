import { PayloadAction } from "@reduxjs/toolkit"
import State from "../state"

export default function handleSetAllowed(state: State, action: PayloadAction<boolean>) {
  state.isAllowed = action.payload
}
