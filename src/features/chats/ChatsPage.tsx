import { Box, Button, Card, Grid } from "@mui/material"

import { useIdParam, useIsCompact } from "../../lib/hooks"

import { Label, Placeholder, PrimaryAction } from "../../components"
import ChatDetail from "./components/chats/ChatDetail"
import ChatsList from "./components/chats/ChatsList"

export default function ChatsPage() {
  const isCompact = useIsCompact()
  const chatId = useIdParam("chatId")

  const compact =
    chatId !== undefined ? (
      <Box>
        <Card elevation={2}>
          <ChatDetail chatId={chatId} />
        </Card>

        {isCompact && (
          <PrimaryAction fixed={true}>
            <Button href="/chats" variant="contained" sx={{ aspectRatio: 1 }}>
              <Label type="chats" display="iconOnly" />
            </Button>
          </PrimaryAction>
        )}
      </Box>
    ) : (
      <Grid item xs={4}>
        <ChatsList openChatId={chatId} />
      </Grid>
    )

  const regular = (
    <Grid container spacing={1}>
      <Grid item xs={5}>
        <ChatsList openChatId={chatId} />
      </Grid>

      <Grid item xs>
        <Card elevation={2}>
          {chatId !== undefined ? (
            <ChatDetail chatId={chatId} />
          ) : (
            <Placeholder message="NO_CHAT_IS_OPENED_PLACEHOLDER" />
          )}
        </Card>
      </Grid>
    </Grid>
  )

  return isCompact ? compact : regular
}
