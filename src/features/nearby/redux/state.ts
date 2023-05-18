import StudentLocation from "../types/Location"

export default interface State {
  isAllowed?: boolean
  locations: {
    [studentId: number]: StudentLocation
  }
}

export const initialState: State = { locations: {} }
