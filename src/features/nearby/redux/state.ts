import StudentLocation from "../types/Location"

export default interface State {
  [studentId: number]: StudentLocation
}

export const initialState: State = {}
