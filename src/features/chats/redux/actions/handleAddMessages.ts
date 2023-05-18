import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"
import Message from "../../types/Message"

export default function handleAddMessages(
  state: State,
  action: PayloadAction<Message[]>
) {
  const filtered = state.messages.filter(
    (existing) => !action.payload.some((newer) => newer.id === existing.id)
  )

  state.messages = [...filtered, ...action.payload]
}
