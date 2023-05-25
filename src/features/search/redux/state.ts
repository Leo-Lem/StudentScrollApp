import SearchResult from "../types/SearchResult"

export default interface State {
  [query: string]: SearchResult[]
}

export const initialState: State = {}
