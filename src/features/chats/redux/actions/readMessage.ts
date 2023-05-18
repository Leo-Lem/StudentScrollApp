import { createAsyncThunk } from "@reduxjs/toolkit"

import { addMessages } from ".."
import Message from "../../types/Message"
import Result from "../../../../lib/Result"
import API from "../../../../lib/API"

export default createAsyncThunk("chats/readMessage", async (params: { chatId: number, messageId: number }, thunkAPI) => {
  const result: Result<Message[], API.Error> = await API.get(thunkAPI, `chats/${params.chatId}/messages/${params.messageId}`)

  if (result.ok) thunkAPI.dispatch(addMessages(result.value))
  else console.error(result.error)
})
