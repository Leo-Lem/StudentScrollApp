import { signOut } from "../features/authentication/authenticationReducer"
import { type RootState } from "."

export function tryGettingAuthorizationHeader(thunkAPI: any): string {
  const state = thunkAPI.getState() as RootState

  if (state.authentication.token === undefined) {
    thunkAPI.dispatch(signOut())
    throw new Error("No token found")
  }

  return `Bearer ${state.authentication.token}`
}

export function tryGettingStudentId(thunkAPI: any): number {
  const state = thunkAPI.getState() as RootState

  const studentId = state.authentication.studentId

  if (studentId === undefined) {
    thunkAPI.dispatch(signOut())
    throw new Error("No student id found")
  }

  return studentId
}
