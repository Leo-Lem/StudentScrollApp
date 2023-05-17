import { type ReactElement, useEffect } from "react"
import { Stack } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../redux"
import { LoadingSpinner } from "../../../components"

import { readMessages } from "../redux"
import MessageList from "./MessageList"
import MessageSendMenu from "./MessageSendMenu"

export default function ChatView({ studentId }: Props): ReactElement {
  const dispatch = useAppDispatch()

  const currentStudentId = useAppSelector(state => state.student.id)
  if (currentStudentId === undefined) throw Error("Not authenticated")

  const messages = useAppSelector((state) => state.chats[studentId])

  useEffect(() => {
    if (messages === undefined) dispatch(readMessages(studentId))
  }, [studentId])

  if (messages === undefined) return <LoadingSpinner />
  else
    return (
      <Stack direction="column">
        <MessageSendMenu receiverId={studentId} />

        <MessageList messages={messages} studentId={currentStudentId} />
      </Stack>
    )
}

interface Props {
  studentId: number
}