import SearchResult from "../types/SearchResult"

export default interface State {
  __history__: SearchResult[]
  [query: string]: SearchResult[]
}

export const initialState: State = { __history__: [] }
