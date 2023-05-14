import { useState, type ReactElement } from "react"
import { Box, Button, Collapse, Stack, Typography } from "@mui/material"

import { ErrorFeedback, AsyncButton } from "../../../components"
import { useAppDispatch, useAppSelector } from "../../../redux"
import useBinding from "../../../hooks/useBinding"

import NameTextField from "./NameTextField"
import EmailTextField from "./EmailTextField"
import PasswordTextField from "./PasswordTextField"

import { signIn, signUp } from "../authenticationReducer"
import AuthenticationStatus from "../types/AuthenticationStatus"
import { useTranslation } from "react-i18next"

export default function AuthenticationForm(): ReactElement {
  const status = useAppSelector((state) => state.authentication.status)
  const error = useAppSelector((state) => state.authentication.error)

  const dispatch = useAppDispatch()

  const [isRegistering, setIsRegistering] = useState(false)
  const $name = useBinding<string | "invalid" | undefined>(undefined)
  const $email = useBinding<string | "invalid" | undefined>(undefined)
  const $password = useBinding<string | "invalid" | undefined>(undefined)
  const [isFeedbackActive, setIsFeedbackActive] = useState(false)

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
      console.log("Invalid" + $name.get + $email.get + $password.get)

      setIsFeedbackActive(true)
      return false
    } else if (isRegistering) {
      await dispatch(signUp({ name: $name.get ?? "", email: $email.get, password: $password.get }))
    } else {
      await dispatch(signIn({ email: $email.get, password: $password.get }))
    }

    return status === AuthenticationStatus.authenticated
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Stack spacing={2} marginTop={3}>
        <Collapse in={isRegistering}>
          <NameTextField $name={$name} showsFeedback={isFeedbackActive} />
        </Collapse>

        <EmailTextField $email={$email} validate={isRegistering} showsFeedback={isFeedbackActive} />

        <PasswordTextField
          $password={$password}
          isRegistering={isRegistering}
          showsFeedback={isFeedbackActive}
          onSubmit={authenticate}
        />

        <AsyncButton action={authenticate} variant="contained">
          {isRegistering ? t("SIGNUP") : t("SIGNIN")}
        </AsyncButton>

        <ErrorFeedback isError={status === AuthenticationStatus.failed} message={error ?? ""} />

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
