import { Box, Button, Collapse, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { AsyncButton, ErrorFeedback, Label } from "../../../components"
import { useBinding } from "../../../lib/hooks"

import EmailTextField from "./EmailTextField"
import NameTextField from "./NameTextField"
import PasswordTextField from "./PasswordTextField"

import { useAuthenticate } from "../redux"
import useAuthenticationStatus from "../redux/hooks/useAuthenticationStatus"

export default function AuthenticationForm() {
  const [t] = useTranslation()

  const { status, error } = useAuthenticationStatus()
  const authenticate = useAuthenticate()

  const [isRegistering, setIsRegistering] = useState(false)
  const $name = useBinding<string | "invalid" | undefined>(undefined)
  const $email = useBinding<string | "invalid" | undefined>(undefined)
  const $password = useBinding<string | "invalid" | undefined>(undefined)

  useEffect(() => {
    if (!isRegistering) $name.set(undefined)
    else {
      $email.set(undefined)
      $password.set(undefined)
    }
  }, [isRegistering])

  const handleAuthentication = async (): Promise<boolean> => {
    if (
      (isRegistering && $name.get === undefined) ||
      (isRegistering && $name.get === "invalid") ||
      $email.get === undefined ||
      $email.get === "invalid" ||
      $password.get === undefined ||
      $password.get === "invalid"
    ) {
      if (isRegistering && $name.get === undefined) $name.set("invalid")
      if ($email.get === undefined) $email.set("invalid")
      if ($password.get === undefined) $password.set("invalid")
    } else {
      await authenticate($name.get, $email.get, $password.get)
    }

    return status === "authenticated"
  }

  const helperText = (() => {
    switch (error) {
      case undefined:
        return ""
      case "invalidCredentials":
        return t("INVALID_CREDENTIALS")
      case "emailInUse":
        return t("EMAIL_IN_USE")
      case "unknown":
        return t("UNKNOWN_ERROR")
    }
  })()

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Stack spacing={2} marginTop={3}>
        <Collapse in={isRegistering}>
          <NameTextField $name={$name} />
        </Collapse>

        <EmailTextField $email={$email} validate={isRegistering} />

        <PasswordTextField
          $password={$password}
          isRegistering={isRegistering}
          onSubmit={handleAuthentication}
        />

        <AsyncButton action={handleAuthentication} variant="contained">
          <Label type={isRegistering ? "signup" : "signin"} />
        </AsyncButton>

        <ErrorFeedback isError={status === "failed"} message={helperText} />

        <Button
          variant="text"
          size="small"
          onClick={() => {
            setIsRegistering(!isRegistering)
          }}
        >
          <Typography variant="caption" overflow="clip">
            {isRegistering ? t("SWITCH_TO_SIGNIN") : t("SWITCH_TO_SIGNUP")}
          </Typography>
        </Button>
      </Stack>
    </Box>
  )
}
