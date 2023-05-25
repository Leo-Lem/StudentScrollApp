import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"
import handleAddSearchResult from "./actions/handleAddSearchResult"
import extraReducers from "./actions/actions"
import handleAddToHistory from "./actions/handleAddToHistory"

const search = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    addSearchResult: handleAddSearchResult,
    addToHistory: handleAddToHistory
  },
  extraReducers
})

export default search
export const { addSearchResult, addToHistory } = search.actions
