import LocationStatus from "../types/LocationStatus"
import StudentLocation from "../types/StudentLocation"

export default interface State {
  status?: LocationStatus
  location?: StudentLocation
}

export const initialState: State = {}
