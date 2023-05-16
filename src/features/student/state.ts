import { Profile } from "../profiles"
import { Settings } from "../settings"

export default interface State {
  id: number
  profile?: Profile
  settings?: Settings
  followers?: number[]
  follows?: number[]
}

export const initialState: State | null = null