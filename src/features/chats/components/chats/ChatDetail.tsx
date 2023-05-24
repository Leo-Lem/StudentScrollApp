import { Stack } from "@mui/material"
import { useEffect, useRef } from "react"

import { LoadingSpinner } from "../../../../components"
import { useIsCompact } from "../../../../lib/hooks"

import { useChat } from "../../redux"
import MessageList from "../messages/MessageList"
import MessageSendMenu from "../messages/MessageSendMenu"

export default function ChatDetail({ chatId }: Props) {
  const isCompact = useIsCompact()

  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isCompact) scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [scrollRef])

  const chat = useChat(chatId)

  if (chat === undefined) return <LoadingSpinner />
  else
    return (
      <Stack maxHeight="80vh">
        {!isCompact && <MessageSendMenu chatId={chatId} />}

        <Stack direction={isCompact ? "column-reverse" : "column"} overflow="scroll">
          <div ref={scrollRef} />
          <MessageList chat={chat} newestFirst={!isCompact} />
        </Stack>

        {isCompact && <MessageSendMenu chatId={chatId} />}
      </Stack>
    )
}

interface Props {
  chatId: number
}
