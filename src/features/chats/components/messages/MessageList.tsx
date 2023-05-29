import { Divider, Stack } from "@mui/material"
import { Fragment } from "react"

import { LoadingSpinner, Placeholder } from "../../../../components"
import Chat from "../../types/Chat"
import MessageItem from "./MessageItem"
import { useMessages } from "../../redux"

export default function MessageList({ chat, newestFirst }: Props) {
  const { messages, isLoading } = useMessages(chat)

  const sorted = messages.sort(
    (lhs, rhs) => new Date(lhs.timestamp).getTime() - new Date(rhs.timestamp).getTime()
  )

  return (
    <Stack direction={newestFirst ? "column-reverse" : "column"} padding={1} gap={1}>
      {sorted.length < 1 && <Placeholder />}

      {sorted.map((message) => (
        <Fragment key={message.id}>
          <MessageItem message={message} />
          {sorted.indexOf(message) !== sorted.length - 1 && <Divider variant="middle" />}
        </Fragment>
      ))}

      {isLoading && <LoadingSpinner />}
    </Stack>
  )
}

interface Props {
  chat: Chat
  newestFirst: boolean
}
