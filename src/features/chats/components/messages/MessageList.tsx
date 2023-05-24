import { Divider, Stack } from "@mui/material"
import { Fragment } from "react"

import { Placeholder } from "../../../../components"
import Chat from "../../types/Chat"
import MessageItem from "./MessageItem"

export default function MessageList({ chat, newestFirst }: Props) {
  const ids = chat.messageIds

  return (
    <Stack direction={newestFirst ? "column-reverse" : "column"} padding={1} gap={1}>
      {ids.length < 1 && <Placeholder />}

      {ids.map((id) => (
        <Fragment key={id}>
          <MessageItem chatId={chat.id} messageId={id} />
          {ids.indexOf(id) !== ids.length - 1 && <Divider variant="middle" />}
        </Fragment>
      ))}
    </Stack>
  )
}

interface Props {
  chat: Chat
  newestFirst: boolean
}
