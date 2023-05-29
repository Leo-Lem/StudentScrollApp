import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"
import Message from "../../types/Message"
import readMessage from "../actions/readMessage"
import Chat from "../../types/Chat"

export default function useMessages(chat: Chat): { messages: Message[]; isLoading: boolean } {
  const messages = useAppSelector((state) =>
    state.chats.messages.filter((message) => chat.messageIds.includes(message.id))
  )
  const isLoading = messages.length < chat.messageIds.length

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (isLoading)
      chat.messageIds.forEach((messageId) => dispatch(readMessage({ chatId: chat.id, messageId })))
  }, [])

  return { messages, isLoading }
}
