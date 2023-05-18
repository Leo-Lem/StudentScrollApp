import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"

import handleAddMessages from "./actions/handleAddMessages"
import handleStartChat from "./actions/handleStartChat"

const chats = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addMessages: handleAddMessages,
    startChat: handleStartChat
  }
})

export default chats
