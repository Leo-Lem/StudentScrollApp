import { Profile } from "../profiles"
import { Settings } from "../settings"

export default interface State {
  id?: number
  profile?: Profile
  followers?: number[]
  follows?: number[]
  settings?: Settings
}

export const initialState: State = {}