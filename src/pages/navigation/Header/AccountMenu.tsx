import { Box, IconButton, Menu } from "@mui/material"
import { ReactElement, useState } from "react"
import { AccountBox, AccountCircle } from "@mui/icons-material"

import SignOutMenuItem from "./SignOutMenuItem"
import LinkMenuItem from "../../../features/shared/components/LinkMenuItem"

import { useAppSelector } from "../../../redux"

export default function AccountMenu(): ReactElement {
  const studentId = useAppSelector((state) => state.authentication.studentId)

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
        {studentId !== undefined && (
          <LinkMenuItem
            startIcon={<AccountBox />}
            href={`/profile/${studentId}`}
            dismiss={dismiss}
          >
            Profile
          </LinkMenuItem>
        )}

        <SignOutMenuItem dismiss={dismiss} />
      </Menu>
    </Box>
  )
}
