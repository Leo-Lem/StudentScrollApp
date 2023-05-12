import { type ReactElement } from "react"
import { Box, Stack } from "@mui/material"

import AuthenticationForm from "../features/authentication/components/AuthenticationForm"
import WelcomeHeader from "./navigation/WelcomeHeader"
import Logo from "../features/shared/components/Logo"
import useIsCompact from "../features/shared/useIsCompact"

export default function WelcomePage(): ReactElement {
  const isCompact = useIsCompact()

  return (
    <Box>
      <WelcomeHeader />

      {isCompact ? (
        <AuthenticationForm />
      ) : (
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexGrow={1}>
          <Logo iconOnly size="max(8vw, 8vh)" />
          <AuthenticationForm />
          <Box />
        </Stack>
      )}
    </Box>
  )
}
