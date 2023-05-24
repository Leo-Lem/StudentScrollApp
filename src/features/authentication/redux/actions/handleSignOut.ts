import State from "../state"

export default function handleSignOut(state: State) {
  state.status = "unauthenticated"
  state.token = undefined

  sessionStorage.removeItem("token")
  sessionStorage.removeItem("studentId")
}
