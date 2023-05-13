import { Box, IconButton, Menu } from "@mui/material"
import { ReactElement, useState } from "react"
import { AccountBox, AccountCircle, Settings } from "@mui/icons-material"

import SignOutMenuItem from "./SignOutMenuItem"
import LinkMenuItem from "../../../components/buttons/LinkMenuItem"

import { useAppSelector } from "../../../redux"

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
        <LinkMenuItem startIcon={<AccountBox />} href={`/profile/${studentId}`} dismiss={dismiss}>
          Profile
        </LinkMenuItem>

        <LinkMenuItem startIcon={<Settings />} href="/settings" dismiss={dismiss}>
          Settings
        </LinkMenuItem>

        <SignOutMenuItem dismiss={dismiss} />
      </Menu>
    </Box>
  )
}
