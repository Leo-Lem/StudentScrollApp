import { Card, Grid, Typography } from "@mui/material"

import { useIdParam, useIsCompact } from "../../lib/hooks"

import ChatDetail from "./components/chats/ChatDetail"
import ChatsList from "./components/chats/ChatsList"

export default function ChatsPage() {
  const isCompact = useIsCompact()
  const chatId = useIdParam("chatId")

  const compact =
    chatId !== undefined ? (
      <Card elevation={2}>
        <ChatDetail chatId={chatId} />
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
          {chatId !== undefined ? (
            <ChatDetail chatId={chatId} />
          ) : (
            <Typography variant="h4" textAlign="center">
              Click on a chat to open it…
            </Typography>
          )}
        </Card>
      </Grid>
    </Grid>
  )

  return isCompact ? compact : regular
}
