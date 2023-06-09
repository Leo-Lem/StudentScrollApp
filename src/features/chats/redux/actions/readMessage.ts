import { createAsyncThunk } from "@reduxjs/toolkit"

import Message from "../../types/Message"
import API, { APIResult } from "../../../../lib/API"

import { addMessages } from "../slice"

export default createAsyncThunk(
  "chats/readMessage",
  async (params: { chatId: number; messageId: number }, thunkAPI) => {
    const result: APIResult<Message> = await API.get(
      thunkAPI,
      `chats/${params.chatId}/messages/${params.messageId}`
    )

    if (result.ok)
      thunkAPI.dispatch(addMessages({ chatId: params.chatId, messages: [result.value] }))
    else console.error(result.error)
  }
)
