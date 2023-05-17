import { type ReactElement, useEffect } from "react"
import {
  Box,
  Stack,
  List,
  Button,
  CircularProgress
} from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../redux"
import useBinding from "../../../lib/useBinding"

import { readMessages, sendMessage } from "../redux"
import MessageList from "./MessageList"
import { readProfile } from "../../profiles/redux"
import { RequiredTextField } from "../../../components"

export default function ChatView({ studentId }: Props): ReactElement {
  const dispatch = useAppDispatch()

  const messages = useAppSelector((state) => state.chats[studentId])
  const profile = useAppSelector((state) => state.profiles[studentId])

  const $newMessage = useBinding<string | undefined>("")

  useEffect(() => {
    if (messages === undefined) dispatch(readMessages(studentId))
    if (profile === undefined) dispatch(readProfile(studentId))
  }, [studentId])

  const handleSendMessage = () => {
    if ($newMessage.get !== undefined) dispatch(sendMessage({ studentId, content: $newMessage.get }))
    else $newMessage.set("invalid")
  }

  if (messages === undefined || profile === undefined) return <CircularProgress />
  else
    return (
      <Box display="flex" flexDirection="column" alignItems="right">
        <Stack spacing={2} marginTop={3}>
          <MessageList messages={messages} name={profile.name} />

          <List>
            <RequiredTextField $value={$newMessage} label="Type your message here" variant="outlined" />

            <Button variant="contained" color="primary" onClick={handleSendMessage}>
              Send
            </Button>
          </List>
        </Stack>
      </Box>
    )
}

interface Props {
  studentId: number
}