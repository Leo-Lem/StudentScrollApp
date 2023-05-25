import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "./state"
import handleAddSearchResult from "./actions/handleAddSearchResult"
import extraReducers from "./actions/actions"

const search = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    addSearchResult: handleAddSearchResult
  },
  extraReducers
})

export default search
export const { addSearchResult } = search.actions
