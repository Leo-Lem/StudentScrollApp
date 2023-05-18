import { createAsyncThunk } from "@reduxjs/toolkit";

import Result from "../../../../lib/Result";
import API from "../../../../lib/API";

import Chat from "../../types/Chat";
import { addChats } from "..";

export default createAsyncThunk("chats/readChats", async (chatId: number, thunkAPI) => {
  const result: Result<Chat, API.Error> = await API.get(thunkAPI, `chats/${chatId}`)

  if (result.ok) thunkAPI.dispatch(addChats([result.value]))
  else console.error(result.error)
})