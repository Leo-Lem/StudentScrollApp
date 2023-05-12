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
            <Logo compact size="max(1.5vw, 1.5vh)" />
          </Button>

          <Typography variant="h1" fontSize="max(7vw, 7vh)" noWrap textAlign="center">
            Welcome!
          </Typography>

          <Box />
        </Stack>
      ) : (
        <Typography variant="h1" fontSize="max(8vw, 8vh)" noWrap textAlign="center">
          Welcome to StudentScroll!
        </Typography>
      )}
    </AppBar>
  )
}
