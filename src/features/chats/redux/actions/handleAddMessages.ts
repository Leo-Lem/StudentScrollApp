import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"
import Message from "../../types/Message";

export default function handleAddMessages(
  state: State, action: PayloadAction<{ studentId: number; messages: Message[] }>
) {
  if (state[action.payload.studentId] === undefined)
    state[action.payload.studentId] = [] as Message[]
  const allMessages = [...state[action.payload.studentId], ...action.payload.messages];

  const sortedMessages = allMessages.sort((lhs: Message, rhs: Message) => rhs.timestamp.getTime() - lhs.timestamp.getTime())

  state[action.payload.studentId] = sortedMessages
}