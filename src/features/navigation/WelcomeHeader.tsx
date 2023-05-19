import { AppBar, Box, Button, Stack, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import { useIsCompact } from "../../lib/hooks"
import { Logo } from "../../components"

export default function WelcomeHeader() {
  const isCompact = useIsCompact()

  const [t] = useTranslation()

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
