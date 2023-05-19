import { signOut } from "../../features/authentication/redux"
import { RootState } from "../../store"

export default function tryGettingStudentId(thunkAPI: any): number {
  const state = thunkAPI.getState() as RootState

  const studentId = state.authentication.studentId

  if (studentId === undefined) {
    thunkAPI.dispatch(signOut())
    throw new Error("No student id found")
  }

  return studentId
}
