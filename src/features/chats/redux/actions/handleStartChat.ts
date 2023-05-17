import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"
import Message from "../../types/Message";

export default function handleStartChat(state: State, action: PayloadAction<number>) {
  state[action.payload] = [] as Message[]
}