import { type ReactElement } from "react"

import { AppBar, Box, Stack, Typography } from "@mui/material"

import Logo from "./Logo"
import AuthenticationForm from "./AuthenticationForm"

export default function WelcomePage({ login, register }: Props): ReactElement {
  return (
    <Box>
      <AppBar color="transparent" position="static">
        <Typography variant="h2" noWrap textAlign="center">
          Welcome to StudentScroll!
        </Typography>
      </AppBar>

      <Stack direction="row" justifyContent="space-evenly" alignItems="center" flexGrow={1}>
        <Box>
          <Logo size="min(80vh, 60vw)" />
        </Box>

        <AuthenticationForm login={login} register={register} />
      </Stack>
    </Box>
  )
}

interface Props {
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
}
