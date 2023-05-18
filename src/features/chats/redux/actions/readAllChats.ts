import { createAsyncThunk } from "@reduxjs/toolkit";

import Result from "../../../../lib/Result";
import API from "../../../../lib/API";
import { tryGettingStudentId } from "../../../../redux";

import Chat from "../../types/Chat";
import { addChats } from "..";

export default createAsyncThunk("chats/readStudentChats", async (_, thunkAPI) => {
  const result: Result<Chat[], API.Error> = await API.get(thunkAPI, `chats?participantId=${tryGettingStudentId(thunkAPI)}`)

  if (result.ok) thunkAPI.dispatch(addChats(result.value))
  else console.error(result.error)
})