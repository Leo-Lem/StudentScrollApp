import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"
import Message from "../../types/Message"

export default function handleAddMessages(state: State, action: PayloadAction<{ chatId: number, messages: Message[] }>) {
  const chatIndex = state.chats?.findIndex((chat) => chat.id === action.payload.chatId)

  if (chatIndex === undefined || chatIndex === -1 || state.chats === undefined) return

  const filteredMessageIds = state.chats[chatIndex].messageIds.filter(
    (existing) => !action.payload.messages.some((newer) => newer.id === existing)
  )

  state.chats[chatIndex].messageIds = [...filteredMessageIds, ...action.payload.messages.map((message) => message.id)]

  const filtered = state.messages.filter(
    (existing) => !action.payload.messages.some((newer) => newer.id === existing.id)
  )

  state.messages = [...filtered, ...action.payload.messages]
}
