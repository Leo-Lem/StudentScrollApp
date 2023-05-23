import { Divider, Grid } from "@mui/material"
import { Fragment, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"

import readMessage from "../../redux/actions/readMessage"
import Chat from "../../types/Chat"
import MessageItem from "./MessageItem"
import { LoadingSpinner, Placeholder as Placeholder } from "../../../../components"

export default function MessageList({ chat, newestFirst }: Props) {
  const dispatch = useAppDispatch()

  const messages = useAppSelector((state) =>
    state.chats.messages
      .filter((m) => chat.messageIds.includes(m.id))
      .sort((lhs, rhs) => new Date(rhs.timestamp).getTime() - new Date(lhs.timestamp).getTime())
  )

  const notFinished = messages.length < chat.messageIds.length

  useEffect(() => {
    if (notFinished)
      for (const messageId of chat.messageIds)
        if (!messages.find((m) => m.id === messageId))
          dispatch(readMessage({ chatId: chat.id, messageId }))
  }, [chat])

  return (
    <Grid container direction={newestFirst ? "column" : "column-reverse"} padding={1} spacing={1}>
      {messages.length < 1 && <Placeholder />}

      {messages.map((message) => (
        <Fragment key={message.id}>
          <Grid item xs marginY={1}>
            <MessageItem message={message} />
          </Grid>

          {messages.indexOf(message) !== messages.length - 1 && <Divider variant="middle" />}
        </Fragment>
      ))}

      {notFinished && <LoadingSpinner />}
    </Grid>
  )
}

interface Props {
  chat: Chat
  newestFirst: boolean
}
