import { Button, Stack } from "@mui/material"

import { Label } from "../../../components"

export default function NavigationButtons() {
  return (
    <Stack direction="row" spacing={3} alignItems="center" paddingX={1}>
      <Button variant="contained" href="/">
        <Label type="posts" />
      </Button>

      <Button variant="contained" href="/chats">
        <Label type="chats" />
      </Button>

      <Button variant="contained" href="/nearby">
        <Label type="nearby" />
      </Button>
    </Stack>
  )
}
