import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../../redux"
import Message from "../../types/Message"
import { addMessages } from ".."

export default createAsyncThunk(
  "chats/readMessages",
  async (studentId: number, thunkAPI) => {
    const currentStudentId = tryGettingStudentId(thunkAPI)

    let response = await fetch(`/api/v1/chats?senderId=${currentStudentId}&receiverId=${studentId}`, {
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (!response.ok) throw Error("Failed to fetch sent messages")

    let messages = await response.json() as Message[]

    response = await fetch(`/api/v1/chats?senderId=${studentId}&receiverId=${currentStudentId}`, {
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (!response.ok) throw Error("Failed to fetch received messages")

    messages.push(...(await response.json() as Message[]))

    thunkAPI.dispatch(addMessages({ studentId, messages }))
  }
)