import { type ReactElement } from "react"
import { AppBar, Box, Stack, Typography } from "@mui/material"

import Logo from "../features/shared/components/Logo"
import AuthenticationForm from "../features/authentication/components/AuthenticationForm"

export default function WelcomePage(): ReactElement {
  return (
    <Box>
      <AppBar position="sticky">
        <Typography variant="h2" fontSize="7vw" noWrap textAlign="center">
          Welcome to StudentScroll!
        </Typography>
      </AppBar>

      <Stack direction="row" justifyContent="space-evenly" alignItems="center" flexGrow={1}>
        <Box>
          <Logo size="min(60vh, 60vw)" />
        </Box>

        <AuthenticationForm />
      </Stack>
    </Box>
  )
}
