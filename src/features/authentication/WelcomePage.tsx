import { type ReactElement } from "react"
import { Box, Stack } from "@mui/material"

import AuthenticationForm from "./components/AuthenticationForm"
import { Logo } from "../../components"

import useIsCompact from "../../hooks/useIsCompact"

export default function WelcomePage(): ReactElement {
  const isCompact = useIsCompact()

  if (isCompact) return <AuthenticationForm />
  else
    return (
      <Stack direction="row" justifyContent="space-between" alignItems="center" flexGrow={1}>
        <Logo iconOnly size="max(8vw, 8vh)" />
        <AuthenticationForm />
        <Box />
      </Stack>
    )
}
