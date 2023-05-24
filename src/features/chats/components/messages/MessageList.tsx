import { Divider, Grid } from "@mui/material"
import { Fragment } from "react"

import { Placeholder } from "../../../../components"
import Chat from "../../types/Chat"
import MessageItem from "./MessageItem"

export default function MessageList({ chat, newestFirst }: Props) {
  const ids = chat.messageIds

  return (
    <Grid container direction={newestFirst ? "column-reverse" : "column"} padding={1} spacing={1}>
      {ids.length < 1 && <Placeholder />}

      {ids.map((id) => (
        <Fragment key={id}>
          <Grid item xs marginY={1}>
            <MessageItem chatId={chat.id} messageId={id} />
          </Grid>

          {ids.indexOf(id) !== ids.length - 1 && <Divider variant="middle" />}
        </Fragment>
      ))}
    </Grid>
  )
}

interface Props {
  chat: Chat
  newestFirst: boolean
}
