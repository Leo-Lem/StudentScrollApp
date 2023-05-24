import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"
import AuthenticationStatus from "../../types/AuthenticationStatus"

export default function handleSetAuthenticated(
  state: State,
  action: PayloadAction<{ studentId: number; token: string }>
) {
  window.location.reload()

  state.token = action.payload.token

  sessionStorage.setItem("token", state.token)

  state.status = AuthenticationStatus.authenticated
}
