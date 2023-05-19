import { AccountCircle } from "@mui/icons-material"
import { Box, IconButton, Menu } from "@mui/material"
import { useState } from "react"

import { Label, LinkMenuItem } from "../../../components"

import SignOutMenuItem from "./SignOutMenuItem"

export default function AccountMenu() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)

  const dismiss = (): void => {
    setAnchor(null)
  }

  return (
    <Box>
      <IconButton
        size="large"
        onClick={({ currentTarget }) => {
          setAnchor(currentTarget)
        }}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>

      <Menu anchorEl={anchor} keepMounted open={Boolean(anchor)} onClose={dismiss}>
        <LinkMenuItem href={"/profile"} dismiss={dismiss}>
          <Label type="profile" />
        </LinkMenuItem>

        <LinkMenuItem href="/settings" dismiss={dismiss}>
          <Label type="settings" />
        </LinkMenuItem>

        <SignOutMenuItem dismiss={dismiss} />
      </Menu>
    </Box>
  )
}
