import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingStudentId } from "../../../../lib/redux"
import API, { APIResult } from "../../../../lib/API"

import { addMessages } from ".."
import Message from "../../types/Message"

export default createAsyncThunk(
  "chats/sendMessage",
  async (request: { chatId: number; content: string }, thunkAPI) => {
    const result: APIResult<Message> = await API.post(thunkAPI, "chats/${chatId}/messages", {
      content: request.content,
      senderId: tryGettingStudentId(thunkAPI)
    })

    if (result.ok) thunkAPI.dispatch(addMessages([result.value]))
    else console.log(result.error)
  }
)
