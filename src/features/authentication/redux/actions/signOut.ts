import AuthenticationStatus from "../../types/AuthenticationStatus"
import State from "../state"

export default function signOut(state: State) {
  state.status = AuthenticationStatus.unauthenticated
  state.token = undefined
  state.studentId = undefined

  sessionStorage.removeItem("token")
  sessionStorage.removeItem("studentId")
}