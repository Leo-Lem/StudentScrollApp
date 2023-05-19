import { Fragment } from "react"
import { Divider, Grid } from "@mui/material"

import MessageItem from "./MessageItem"
import Chat from "../../types/Chat"

export default function MessageList({ chat, newestFirst }: Props) {
  return (
    <Grid container direction={newestFirst ? "column" : "column-reverse"} padding={1} spacing={1}>
      {chat.messageIds.map((id) => (
        <Fragment key={id}>
          <MessageItem chatId={chat.id} messageId={id} />

          {chat.messageIds.indexOf(id) !== chat.messageIds.length - 1 && (
            <Divider variant="middle" />
          )}
        </Fragment>
      ))}
    </Grid>
  )
}

interface Props {
  chat: Chat
  newestFirst: boolean
}
