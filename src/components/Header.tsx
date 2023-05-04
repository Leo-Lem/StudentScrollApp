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
  Stack,
  TextField,
  Toolbar,
  Typography
} from "@mui/material"
import { AccountCircle } from "@mui/icons-material"

import Logo from "./simple/Logo"
import { AuthenticationAPI } from "../api"
import { type Profile } from "../models"

export default function Header(): ReactElement {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  const handleSearch = async (value: string): Promise<void> => {
    if (value === "") return
    if (isNaN(parseInt(value))) return

    const response = await fetch(`/api/v1/students/${value}/profile`)
    setProfile((await response.json()) as Profile)
  }

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

        <Stack direction="row" spacing={1} marginX={1}>
          <Button variant="outlined" color="inherit" href="chat">
            Chat
          </Button>

          <Button variant="outlined" color="inherit" href="nearby">
            Nearby
          </Button>
        </Stack>

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Box position="relative">
          <TextField
            variant="standard"
            sx={{ ml: 1, input: { color: "white" } }}
            placeholder="Search"
            onChange={({ target: { value } }) => {
              handleSearch(value).catch(console.log)
            }}
          />
          {profile !== null && (
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                width: "auto",
                padding: 0,
                my: 0,
                py: 0
              }}
            >
              <Button onClick={() => (window.location.href = "/student/1")}>{profile.name}</Button>
            </Box>
          )}
        </Box>

        {/* <IconButton onClick={handleSearch(query)} color="inherit">
          <Search />
        </IconButton> */}

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
          <MenuItem component={Link} href="profile" onClick={handleClose}>
            Profile
          </MenuItem>

          <MenuItem component={Link} href="settings" onClick={handleClose}>
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              AuthenticationAPI.signout()
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
