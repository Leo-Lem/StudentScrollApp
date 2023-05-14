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

export function tryGettingStudentId(thunkAPI: any): number | undefined {
  const state = thunkAPI.getState() as RootState

  if (state.authentication.studentId === undefined) thunkAPI.dispatch(signOut())

  return state.authentication.studentId
}
