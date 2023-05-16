import State from "../state"

export default function handleToggleNewestFirst(state: State) {
  state.newestFirst = !state.newestFirst
  state.nextPage = 0
}