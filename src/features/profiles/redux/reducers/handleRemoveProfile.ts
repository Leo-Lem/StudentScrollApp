import State from "../state"

export default function handleRemoveProfile(state: State, action: { payload: number }) {
  const index = state.findIndex((profile) => profile.studentId === action.payload)
  if (index !== -1) state.splice(index, 1)
}
