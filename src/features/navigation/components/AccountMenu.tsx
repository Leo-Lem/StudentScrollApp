import { Box, IconButton, Menu } from "@mui/material"
import { ReactElement, useState } from "react"
import { AccountCircle } from "@mui/icons-material"

import SignOutMenuItem from "./SignOutMenuItem"
import LinkMenuItem from "../../../components/buttons/LinkMenuItem"

import { useAppSelector } from "../../../redux"
import { Label } from "../../../components"

export default function AccountMenu(): ReactElement {
  const studentId = useAppSelector((state) => state.authentication.studentId)

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
        <LinkMenuItem href={`/profile/${studentId}`} dismiss={dismiss}>
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
