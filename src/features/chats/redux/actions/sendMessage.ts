import { createAsyncThunk } from "@reduxjs/toolkit"

import Message from "../../types/Message"
import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../../redux"
import { addMessages } from ".."

export default createAsyncThunk(
  "chats/sendMessage",
  async (request: { studentId: number; content: string }, thunkAPI) => {
    const response = await fetch("/api/v1/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: tryGettingAuthorizationHeader(thunkAPI)
      },
      body: JSON.stringify({
        content: request.content,
        senderId: tryGettingStudentId(thunkAPI),
        receiverId: request.studentId
      })
    })

    if (!response.ok) throw Error("Failed to send message")

    thunkAPI.dispatch(
      addMessages({ studentId: request.studentId, messages: [(await response.json()) as Message] })
    )
  }
)
