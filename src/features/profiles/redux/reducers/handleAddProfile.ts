import Profile from "../../types/Profile"
import State from "../state"

export default function handleAddProfile(state: State, action: { payload: Profile }) {
  const index = state.findIndex((profile) => profile.studentId === action.payload.studentId)
  if (index !== -1) state[index] = action.payload
  else state.push(action.payload)
}
