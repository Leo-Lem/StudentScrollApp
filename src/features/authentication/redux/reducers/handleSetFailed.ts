import { PayloadAction } from "@reduxjs/toolkit"

import AuthenticationError from "../../types/AuthenticationError"
import State from "../state"

export default function handleSetFailed(state: State, action: PayloadAction<AuthenticationError>) {
  state.error = action.payload
  state.status = "failed"
}
