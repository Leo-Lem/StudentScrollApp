import { Card, Divider, Stack, Typography } from "@mui/material"
import { Fragment } from "react"

import { useAppSelector } from "../../../../lib/hooks"
import { LoadingSpinner } from "../../../../components"

import ChatLink from "./ChatLink"

export default function ChatsList() {
  const chatStudentIds = useAppSelector((state) =>
    Object.keys(state.chats).map((key) => parseInt(key))
  )

  const list = (
    <Stack>
      {chatStudentIds.map((studentId) => (
        <Fragment key={studentId}>
          <ChatLink studentId={studentId} />

          {chatStudentIds.indexOf(studentId) !== chatStudentIds.length - 1 && <Divider />}
        </Fragment>
      ))}
    </Stack>
  )

  const placeholder = (
    <Typography variant="h4" textAlign="center">
      No chats yet…
    </Typography>
  )

  return (
    <Card elevation={3}>
      {chatStudentIds === undefined ? (
        <LoadingSpinner />
      ) : chatStudentIds.length === 0 ? (
        placeholder
      ) : (
        list
      )}
    </Card>
  )
}
