import { PayloadAction } from "@reduxjs/toolkit";

import State from "../state";
import AuthenticationStatus from "../../types/AuthenticationStatus"

export default function setAuthenticated(
  state: State, action: PayloadAction<{ studentId: number; token: string }>
) {
  state.token = action.payload.token
  state.studentId = action.payload.studentId

  sessionStorage.setItem("token", state.token)
  sessionStorage.setItem("studentId", state.studentId.toString())

  window.location.reload()

  state.status = AuthenticationStatus.authenticated
}