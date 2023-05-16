import { Profile } from "../profiles"
import { Settings } from "../settings"

export default interface State {
  id?: number
  profile?: Profile
  followers?: number[]
  follows?: number[]
  settings?: Settings
}

const studentId = sessionStorage.getItem("studentId")

export const initialState: State = {
  id: studentId !== null ? parseInt(studentId) : undefined,
}