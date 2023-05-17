import { type ReactElement, useEffect, useRef } from "react"
import { Stack } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../redux"
import { LoadingSpinner } from "../../../components"

import { readMessages } from "../redux"
import MessageList from "./MessageList"
import MessageSendMenu from "./MessageSendMenu"
import useIsCompact from "../../../lib/useIsCompact"

export default function ChatDetail({ studentId }: Props): ReactElement {
  const isCompact = useIsCompact()
  const dispatch = useAppDispatch()

  const dummyRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isCompact) dummyRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [dummyRef])

  const currentStudentId = useAppSelector((state) => state.student.id)
  if (currentStudentId === undefined) throw Error("Not authenticated")

  const messages = useAppSelector((state) => state.chats[studentId])

  useEffect(() => {
    if (messages === undefined) dispatch(readMessages(studentId))
  }, [studentId])

  if (messages === undefined) return <LoadingSpinner />
  else
    return (
      <Stack direction={isCompact ? "column-reverse" : "column"}>
        <MessageSendMenu receiverId={studentId} />
        <MessageList messages={messages} studentId={currentStudentId} newestFirst={!isCompact} />
        <div ref={dummyRef} />
      </Stack>
    )
}

interface Props {
  studentId: number
}
