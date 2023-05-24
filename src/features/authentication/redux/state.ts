import AuthenticationError from "../types/AuthenticationError"
import AuthenticationStatus from "../types/AuthenticationStatus"

export default interface State {
  status: AuthenticationStatus
  token?: string
  error?: AuthenticationError
}

const token = sessionStorage.getItem("token")

export const initialState: State = {
  status: token !== null ? "authenticated" : "unauthenticated",
  token: token !== null ? token : undefined
}
