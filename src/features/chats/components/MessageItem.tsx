import { Grid, Typography } from "@mui/material"
import { ProfileLink } from "../../profiles"
import Message from "../types/Message"

export default function MessageItem({ message, studentId }: Props) {
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

interface Props {
  message: Message
  studentId: number
}
