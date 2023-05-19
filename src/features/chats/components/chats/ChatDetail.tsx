import { Stack } from "@mui/material"
import { useEffect, useRef } from "react"

import { LoadingSpinner } from "../../../../components"
import { useAppDispatch, useAppSelector, useIsCompact } from "../../../../lib/hooks"

import readChat from "../../redux/actions/readChat"
import MessageList from "../messages/MessageList"
import MessageSendMenu from "../messages/MessageSendMenu"

export default function ChatDetail({ chatId }: Props) {
  const isCompact = useIsCompact()
  const dispatch = useAppDispatch()

  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isCompact) scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [scrollRef])

  const chat = useAppSelector((state) => state.chats.chats?.find((c) => c.id === chatId))
  useEffect(() => {
    if (chat === undefined) dispatch(readChat(chatId))
  }, [chatId])

  if (chat === undefined) return <LoadingSpinner />
  else
    return (
      <Stack maxHeight="80vh">
        {!isCompact && <MessageSendMenu chatId={chatId} />}

        <Stack direction={isCompact ? "column-reverse" : "column"} overflow="scroll">
          <MessageList chat={chat} newestFirst={!isCompact} />
          <div ref={scrollRef} />
        </Stack>

        {isCompact && <MessageSendMenu chatId={chatId} />}
      </Stack>
    )
}

interface Props {
  chatId: number
}
