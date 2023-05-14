import { AppBar, Box, Button, Stack, Typography } from "@mui/material"
import { ReactElement } from "react"

import { Logo } from "../../components"
import useIsCompact from "../../hooks/useIsCompact"
import { useTranslation } from "react-i18next"

export default function WelcomeHeader(): ReactElement {
  const isCompact = useIsCompact()

  const [t,] = useTranslation()

  return (
    <AppBar position="sticky">
      {isCompact ? (
        <Stack direction="row" justifyContent="space-between" alignItems="center" padding={1}>
          <Button color="inherit" href="/">
            <Logo compact size="max(1.5vw, 1.5vh)" />
          </Button>

          <Typography variant="h1" fontSize="max(7vw, 7vh)" noWrap textAlign="center">
            {t("WELCOME_SHORT")}
          </Typography>

          <Box />
        </Stack>
      ) : (
        <Typography variant="h1" fontSize="max(8vw, 8vh)" noWrap textAlign="center">
          {t("WELCOME")}
        </Typography>
      )}
    </AppBar>
  )
}
