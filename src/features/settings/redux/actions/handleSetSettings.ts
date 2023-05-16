
import State from "../state";
import Settings from "../../types/Settings";

export default function handleSetSettings(state: State, action: { payload: Settings }) {
  state.settings = action.payload
}