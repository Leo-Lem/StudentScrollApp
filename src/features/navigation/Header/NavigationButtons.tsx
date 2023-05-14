import { Button, Stack } from "@mui/material"
import { ReactElement } from "react"

import { Label } from "../../../components"

export default function NavigationButtons(): ReactElement {
  return (
    <Stack direction="row" spacing={3} alignItems="center" paddingX={1}>
      <Button variant="contained" href="/">
        <Label type="posts" />
      </Button>
      <Button variant="contained" href="chats">
        <Label type="chats" />
      </Button>
    </Stack>
  )
}
