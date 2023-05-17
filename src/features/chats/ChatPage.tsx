import { type ReactElement } from "react"
import { Card, Grid, Typography } from "@mui/material"
import { useParams } from "react-router"

import { useAppSelector } from "../../redux"

import ChatsList from "./components/ChatsList"
import ChatView from "./components/ChatDetail"
import useIsCompact from "../../lib/useIsCompact"

export default function ChatPage(): ReactElement {
  const isCompact = useIsCompact()

  const { studentId } = useParams()
  const currentStudentId = useAppSelector((state) => state.student.id)

  const chatIsOpen =
    studentId !== undefined &&
    !isNaN(parseInt(studentId)) &&
    currentStudentId !== parseInt(studentId)

  const compact = chatIsOpen ? (
    <Card elevation={2}>
      <ChatView studentId={parseInt(studentId)} />
    </Card>
  ) : (
    <Grid item xs={4}>
      <ChatsList />
    </Grid>
  )

  const regular = (
    <Grid container spacing={1}>
      <Grid item xs={5}>
        <ChatsList />
      </Grid>

      <Grid item xs>
        <Card elevation={2}>
          {
            chatIsOpen ? (
              <ChatView studentId={parseInt(studentId)} />
            ) : (
              <Typography variant="h4" textAlign="center">
                Click on a chat to open it…
              </Typography>
            ) // TODO: add better placeholder
          }
        </Card>
      </Grid>
    </Grid>
  )

  return isCompact ? compact : regular
}
