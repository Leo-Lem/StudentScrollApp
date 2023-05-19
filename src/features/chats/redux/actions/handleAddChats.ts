import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"
import Chat from "../../types/Chat"

export default function handleAddChats(state: State, action: PayloadAction<Chat[]>) {
  if (state.chats === undefined) state.chats = []

  const filtered = state.chats.filter(
    (existing) => !action.payload.some((newer) => newer.id === existing.id)
  )

  state.chats = [...filtered, ...action.payload]
}
