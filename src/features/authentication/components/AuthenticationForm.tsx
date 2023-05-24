import { Box, Button, Collapse, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { AsyncButton, ErrorFeedback, Label } from "../../../components"
import { useBinding, useAppSelector, useAppDispatch } from "../../../lib/hooks"

import EmailTextField from "./EmailTextField"
import NameTextField from "./NameTextField"
import PasswordTextField from "./PasswordTextField"

import { signIn, signUp } from "../redux"
import AuthenticationStatus from "../types/AuthenticationStatus"
import AuthenticationError from "../types/AuthenticationError"

export default function AuthenticationForm() {
  const status = useAppSelector((state) => state.authentication.status)
  const error = useAppSelector((state) => state.authentication.error)

  const dispatch = useAppDispatch()

  const [isRegistering, setIsRegistering] = useState(false)
  const $name = useBinding<string | "invalid" | undefined>(undefined)
  const $email = useBinding<string | "invalid" | undefined>(undefined)
  const $password = useBinding<string | "invalid" | undefined>(undefined)

  const [t] = useTranslation()

  const authenticate = async (): Promise<boolean> => {
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
    } else if (isRegistering) {
      await dispatch(signUp({ name: $name.get ?? "", email: $email.get, password: $password.get }))
    } else {
      await dispatch(signIn({ email: $email.get, password: $password.get }))
    }

    return status === "authenticated"
  }

  function helperText(error: AuthenticationError) {
    switch (error) {
      case "invalidCredentials":
        return t("INVALID_CREDENTIALS")
      case "emailInUse":
        return t("EMAIL_IN_USE")
      case "unknown":
        return t("UNKNOWN_ERROR")
    }
  }

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
          onSubmit={authenticate}
        />

        <AsyncButton action={authenticate} variant="contained">
          <Label type={isRegistering ? "signup" : "signin"} />
        </AsyncButton>

        <ErrorFeedback isError={status === "failed"} message={error ?? ""} />

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
