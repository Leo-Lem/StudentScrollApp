import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"
import AuthenticationStatus from "../../types/AuthenticationStatus"

export default function handleSetAuthenticated(
  state: State,
  action: PayloadAction<{ studentId: number; token: string }>
) {
  window.location.reload()

  state.token = action.payload.token
  state.studentId = action.payload.studentId

  sessionStorage.setItem("token", state.token)
  sessionStorage.setItem("studentId", state.studentId.toString())

  state.status = AuthenticationStatus.authenticated
}
