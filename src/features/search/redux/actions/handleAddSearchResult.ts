import SearchResult from "../../types/SearchResult"
import State from "../state"

export default function handleAddSearchResult(
  state: State,
  action: { payload: { query: string; result: SearchResult } }
) {
  if (state[action.payload.query] === undefined)
    state[action.payload.query] = [action.payload.result]
  else {
    const index = state[action.payload.query].findIndex((result) => {
      if (result.id === "profile" && action.payload.result.id === "profile")
        return result.value.studentId === action.payload.result.value.studentId
      else if (result.id === "post" && action.payload.result.id === "post")
        return result.value.id === action.payload.result.value.id
      else return false
    })
    if (index === -1) state[action.payload.query].push(action.payload.result)
    else state[action.payload.query][index] = action.payload.result
  }
}
