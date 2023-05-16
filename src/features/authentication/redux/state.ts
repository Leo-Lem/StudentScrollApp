import AuthenticationError from "../types/AuthenticationError"
import AuthenticationStatus from "../types/AuthenticationStatus"

export default interface State {
  status: AuthenticationStatus
  token?: string
  studentId?: number
  error?: AuthenticationError
}

const token = sessionStorage.getItem("token")
const studentId = sessionStorage.getItem("studentId")

export const initialState: State = {
  status:
    token !== null && studentId !== null
      ? AuthenticationStatus.authenticated
      : AuthenticationStatus.unauthenticated,
  token: token !== null ? token : undefined,
  studentId: studentId !== null ? parseInt(studentId) : undefined
}