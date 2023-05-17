import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"
import Message from "../../types/Message"

export default function handleAddMessages(state: State, action: PayloadAction<{ studentId: number; messages: Message[] }>) {
  if (state[action.payload.studentId] === undefined)
    state[action.payload.studentId] = [] as Message[]

  const filteredMessages = state[action.payload.studentId].filter((existingMessage) => !action.payload.messages.some((newMessage) => newMessage.id === existingMessage.id))
  const allMessages = [...filteredMessages, ...action.payload.messages]

  allMessages.sort((lhs: Message, rhs: Message) => new Date(rhs.timestamp).getTime() - new Date(lhs.timestamp).getTime())

  state[action.payload.studentId] = allMessages
}