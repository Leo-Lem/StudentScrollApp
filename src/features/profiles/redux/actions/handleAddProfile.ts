import Profile from "../../types/Profile"
import State from "../state"

export default function handleAddProfile(
  state: State,
  action: { payload: { studentId: number; profile: Profile } }
) {
  state[action.payload.studentId] = action.payload.profile
}
