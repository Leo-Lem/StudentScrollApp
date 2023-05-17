import { Fragment } from "react"
import { Card, Divider, Stack } from "@mui/material"

import { useAppSelector } from "../../../redux"

import ChatLink from "./ChatLink"
import { LoadingSpinner } from "../../../components"

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

  return <Card elevation={3}>{chatStudentIds === undefined ? <LoadingSpinner /> : list}</Card>
}
