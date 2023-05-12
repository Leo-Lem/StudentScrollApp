import { Chat, DynamicFeed } from "@mui/icons-material"
import { Button, Stack } from "@mui/material"
import { ReactElement } from "react"

export default function NavigationButtons(): ReactElement {
  return (
    <Stack direction="row" spacing={3} alignItems="center" paddingX={1}>
      <Button variant="contained" href="/" startIcon={<DynamicFeed />}>
        Posts
      </Button>
      <Button variant="contained" href="chats" startIcon={<Chat />}>
        Chats
      </Button>
    </Stack>
  )
}
