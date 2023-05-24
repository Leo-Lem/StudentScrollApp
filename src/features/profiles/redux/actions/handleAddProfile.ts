import Profile from "../../types/Profile"
import State from "../state"

export default function handleAddProfile(state: State, action: { payload: Profile }) {
  if (state.find((profile) => profile.studentId === action.payload.studentId))
    return state.map((profile) =>
      profile.studentId === action.payload.studentId ? action.payload : profile
    )
  else state.push(action.payload)
}
