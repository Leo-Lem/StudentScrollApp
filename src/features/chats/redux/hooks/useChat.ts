import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"
import Chat from "../../types/Chat"
import readAllChats from "../actions/readAllChats"

export default function useChat(chatId: number): Chat | undefined {
  const chat = useAppSelector((state) => state.chats.chats?.find((c) => c.id === chatId))

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (chat === undefined) void dispatch(readAllChats())
  }, [])

  return chat
}
