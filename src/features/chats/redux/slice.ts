import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"

import handleAddMessages from "./reducers/handleAddMessages"
import handleAddChats from "./hooks/handleAddChats"

const chats = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChats: handleAddChats,
    addMessages: handleAddMessages
  }
})

export default chats
export const { addChats, addMessages } = chats.actions
