import { Grid, Typography } from "@mui/material"

import { ProfileLink } from "../../../profiles"
import { useStudentId } from "../../../student"
import { useMessage } from "../../redux"
import Message from "../../types/Message"
import { LoadingSpinner } from "../../../../components"

function Render({ message, isSender }: { message: Message; isSender: boolean }) {
  const badge = (
    <Grid item xs={3} sm={2}>
      <ProfileLink studentId={message.senderId} disabled={isSender} />
    </Grid>
  )

  return (
    <Grid container direction="row" alignItems="center" gap={1}>
      {!isSender && badge}

      <Grid item xs container direction="column" gap={1} alignItems={isSender ? "end" : "start"}>
        <Typography noWrap variant="h4" textAlign="center" fontSize="min(5vw, 5vh)">
          {message.content}
        </Typography>

        <Typography noWrap variant="caption">
          {new Date(message.timestamp).toLocaleTimeString([], {
            year: "2-digit",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </Typography>
      </Grid>

      {isSender && badge}
    </Grid>
  )
}

export default function MessageItem({ chatId, messageId }: Props) {
  const studentId = useStudentId()

  const message = useMessage(chatId, messageId)

  if (message === undefined) return <LoadingSpinner />
  else return <Render message={message} isSender={message.senderId === studentId} />
}

interface Props {
  chatId: number
  messageId: number
}
