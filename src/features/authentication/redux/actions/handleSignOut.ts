import AuthenticationStatus from "../../types/AuthenticationStatus"
import State from "../state"

export default function handleSignOut(state: State) {
  state.status = AuthenticationStatus.unauthenticated
  state.token = undefined

  sessionStorage.removeItem("token")
  sessionStorage.removeItem("studentId")
}
