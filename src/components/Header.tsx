import { useState, type ReactElement, type MouseEvent } from "react"

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
import { AccountCircle, Search } from "@mui/icons-material"

import Logo from "./Logo"
import { AuthenticationAPI } from "../api"

export default function Header(): ReactElement {
  const [query, setQuery] = useState("")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleSearch = (): void => {
    console.log(query)

    // TODO: handle search
  }
  const handleMenu = (e: MouseEvent<HTMLElement>): void => {
    setAnchorEl(e.currentTarget)
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

        <TextField
          variant="standard"
          sx={{ ml: 1, input: { color: "white" } }}
          placeholder="Search"
          onChange={({ target: { value } }) => {
            setQuery(value)
          }}
          onSubmit={handleSearch}
        />

        <IconButton onClick={handleSearch} color="inherit">
          <Search />
        </IconButton>

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <IconButton size="large" onClick={handleMenu} color="inherit">
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