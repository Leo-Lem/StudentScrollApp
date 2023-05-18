import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"

import handleAddMessages from "./actions/handleAddMessages"
import handleAddChats from "./actions/handleAddChats"

const chats = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChats: handleAddChats,
    addMessages: handleAddMessages
  }
})

export default chats
