import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"
import Message from "../../types/Message"
import readMessage from "../actions/readMessage"

export default function useMessage(chatId: number, messageId: number): Message | undefined {
  const message = useAppSelector((state) => state.chats.messages.find((m) => m.id === messageId))

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (message === undefined) void dispatch(readMessage({ chatId, messageId }))
  }, [])

  return message
}
