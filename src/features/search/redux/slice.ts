import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"
import handleAddSearchResult from "./reducers/handleAddSearchResult"
import handleAddToHistory from "./reducers/handleAddToHistory"
import extraReducers from "./reducers"

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
