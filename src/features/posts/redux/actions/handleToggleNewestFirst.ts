import State from "../state"

export default function handleToggleNewestFirst(state: State) {
  state.newestFirst = !state.newestFirst
  state.posts = []
  state.nextPage = 0
}
