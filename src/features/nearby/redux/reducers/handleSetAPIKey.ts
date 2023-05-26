import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"

export default function handleSetAPIKey(state: State, action: PayloadAction<string>) {
  state.apiKey = action.payload
}
