import { AppBar, Box, Button, Stack, Typography } from "@mui/material"
import { ReactElement } from "react"

import Logo from "../../features/shared/components/Logo"
import useIsCompact from "../../features/shared/useIsCompact"

export default function WelcomeHeader(): ReactElement {
  const isCompact = useIsCompact()

  return (
    <AppBar position="sticky">
      {isCompact ? (
        <Stack direction="row" justifyContent="space-between" alignItems="center" padding={1}>
          <Button color="inherit" href="/">
            <Logo compact size="min(2vw, 2vh)" />
          </Button>

          <Typography variant="h1" fontSize="min(8vw, 8vh)" noWrap textAlign="center">
            Welcome!
          </Typography>

          <Box />
        </Stack>
      ) : (
        <Typography variant="h1" fontSize="min(12vw, 12vh)" noWrap textAlign="center">
          Welcome to StudentScroll!
        </Typography>
      )}
    </AppBar>
  )
}
