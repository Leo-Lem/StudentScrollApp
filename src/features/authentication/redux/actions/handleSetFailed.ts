import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"
import AuthenticationError from "../../types/AuthenticationError"
import AuthenticationStatus from "../../types/AuthenticationStatus"

export default function handleSetFailed(state: State, action: PayloadAction<AuthenticationError>) {
  state.error = action.payload
  state.status = AuthenticationStatus.failed
}
