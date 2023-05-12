import { Box, IconButton, Menu } from "@mui/material"
import { ReactElement, useState } from "react"
import { AccountBox, AccountCircle } from "@mui/icons-material"

import SignOutMenuItem from "./SignOutMenuItem"
import LinkMenuItem from "../../../components/LinkMenuItem"

import { useAppSelector } from "../../../redux"

export default function AccountMenu(): ReactElement {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const dismiss = (): void => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <IconButton
        size="large"
        onClick={({ currentTarget }) => {
          setAnchorEl(currentTarget)
        }}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>

      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={dismiss}>
        <LinkMenuItem startIcon={<AccountBox />} href="/profile" dismiss={dismiss}>
          Profile
        </LinkMenuItem>

        <SignOutMenuItem dismiss={dismiss} />
      </Menu>
    </Box>
  )
}
