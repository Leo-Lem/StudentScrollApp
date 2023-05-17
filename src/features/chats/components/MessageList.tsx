import { Fragment } from "react";
import { Divider, Grid } from "@mui/material"

import Message from "../types/Message"
import MessageItem from "./MessageItem"

export default function MessageList({ messages, studentId }: Props) {
  return (
    <Grid container direction="column" padding={1} spacing={1}>
      {messages.map((message: Message) => (
        <Fragment key={message.id}>
          <MessageItem message={message} studentId={studentId} />
          {messages.indexOf(message) !== messages.length - 1 && <Divider variant="middle" />}
        </Fragment>
      ))}
    </Grid>
  )
}

interface Props {
  messages: Message[]
  studentId: number
}