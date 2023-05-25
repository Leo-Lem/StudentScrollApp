import SearchResult from "../../types/SearchResult"
import State from "../state"

export default function handleAddSearchResult(state: State, action: { payload: { query: string, result: SearchResult } }) {
    if(state[action.payload.query] === undefined)
      state[action.payload.query] = [action.payload.result]
    else
      state[action.payload.query].push(action.payload.result)
}
