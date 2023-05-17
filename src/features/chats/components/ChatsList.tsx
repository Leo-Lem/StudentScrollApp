import { Box, Stack, CircularProgress } from "@mui/material"

import { useAppSelector } from "../../../redux"

import ChatLink from "./ChatLink"

export default function ChatsList() {
  const chatStudentIds = useAppSelector((state) => Object.keys(state.chats).map(key => parseInt(key)))

  if (chatStudentIds === undefined) return <CircularProgress />
  else
    return (
      <Box display="flex" flexDirection="column">
        <Stack sx={{ textAlign: "center" }} spacing={2} marginTop={3}>
          {chatStudentIds.map(studentId => <ChatLink key={studentId} studentId={studentId} />)}
        </Stack>
      </Box>
    )
}
