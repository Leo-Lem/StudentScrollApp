import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "./state"
import handleAddSearchResult from "./actions/handleAddSearchResult"

const search = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    addSearchResult: handleAddSearchResult
  }
})

export default search
export const { addSearchResult } = search.actions
