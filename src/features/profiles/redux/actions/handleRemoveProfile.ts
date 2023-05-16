import State from "../state"

export default function handleRemoveProfile(state: State, action: { payload: number }) {
  delete state[action.payload]
}
