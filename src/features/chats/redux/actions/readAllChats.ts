import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingStudentId } from "../../../../lib/redux"
import API, { APIResult } from "../../../../lib/API"

import { addChats } from ".."
import Chat from "../../types/Chat"

export default createAsyncThunk("chats/readStudentChats", async (_, thunkAPI) => {
  const result: APIResult<Chat[]> = await API.get(thunkAPI, "chats")

  if (result.ok) thunkAPI.dispatch(addChats(result.value))
  else console.error(result.error)
})
