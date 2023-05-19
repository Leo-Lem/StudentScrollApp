import { useEffect } from "react"
import { Grid, Typography } from "@mui/material"

import { LoadingSpinner } from "../../../../components"
import { useAppDispatch, useAppSelector, useStudentId } from "../../../../lib/hooks"

import { ProfileLink } from "../../../profiles"
import Message from "../../types/Message"
import readMessage from "../../redux/actions/readMessage"

export function RenderMessageItem({ message }: { message: Message }) {
  const studentId = useStudentId()

  return (
    <Grid
      item
      xs
      container
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      marginY={1}
    >
      <Grid item xs={1}>
        <ProfileLink
          studentId={message.senderId === studentId ? studentId : message.senderId}
          disabled={message.senderId === studentId}
        />
      </Grid>

      <Grid item xs>
        <Typography variant="h4" textAlign="center">
          {message.content}
        </Typography>
      </Grid>

      <Grid item xs={2} alignSelf="end">
        <Typography variant="caption" align="right">
          {new Date(message.timestamp).toLocaleTimeString([], {
            year: "2-digit",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default function MessageItem({ chatId, messageId }: Props) {
  const dispatch = useAppDispatch()

  const message = useAppSelector((state) => state.chats.messages[messageId])

  useEffect(() => {
    if (message === undefined) dispatch(readMessage({ chatId, messageId }))
  }, [chatId, messageId])

  if (message === undefined) return <LoadingSpinner />
  else return <RenderMessageItem message={message} />
}

interface Props {
  chatId: number
  messageId: number
}
