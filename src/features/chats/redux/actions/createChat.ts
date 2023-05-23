import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"

import { addChats } from ".."
import Chat from "../../types/Chat"

export default createAsyncThunk(
  "chats/createChat",
  async (studentId: number, thunkAPI): Promise<number | undefined> => {
    const result: APIResult<Chat> = await API.post(thunkAPI, "chats", [studentId])

    if (result.ok) {
      thunkAPI.dispatch(addChats([result.value]))
      return result.value.id
    } else console.error(result.error)
  }
)
