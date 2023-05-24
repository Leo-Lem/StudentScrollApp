import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"

import Chat from "../../types/Chat"
import { addChats } from "../slice"

export default createAsyncThunk("chats/readStudentChats", async (_, thunkAPI) => {
  const result: APIResult<Chat[]> = await API.get(thunkAPI, "chats")

  if (result.ok) thunkAPI.dispatch(addChats(result.value))
  else console.error(result.error)
})
