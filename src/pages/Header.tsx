import { useState, type ReactElement } from "react"
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material"
import { AccountCircle } from "@mui/icons-material"

import Logo from "../features/shared/components/Logo"
import SearchBar from "../features/profile/components/SearchBar"

import { useAppDispatch, useAppSelector } from "../redux"
import { signOut } from "../features/authentication"

export default function Header(): ReactElement {
  const studentId = useAppSelector((state) => state.authentication.studentId)

  const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="sticky" sx={{ marginBottom: 1 }}>
      <Toolbar>
        <Button startIcon={<Logo />} color="inherit" size="large" href="/">
          <Typography variant="h6">StudentScroll</Typography>
        </Button>

        <Box flexGrow={1} />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <SearchBar />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <IconButton
          size="large"
          onClick={({ currentTarget }) => {
            setAnchorEl(currentTarget)
          }}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {studentId !== undefined && (
            <MenuItem component={Link} href={`profile/${studentId}`} onClick={handleClose}>
              Profile
            </MenuItem>
          )}

          <MenuItem
            onClick={() => {
              dispatch(signOut())
              handleClose()
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
