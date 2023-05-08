import { useState, type ReactElement } from "react"

import { Box, Button, Collapse, Stack, Typography } from "@mui/material"
import ErrorFeedback from "../../components/simple/ErrorFeedback"
import RequiredTextField from "../../components/simple/RequiredTextField"
import AsyncButton from "../../components/simple/AsyncButton"

import { useAppDispatch, useAppSelector } from "../../app"

import { signIn, signUp } from "./authentication"
import AuthenticationStatus from "./types/AuthenticationStatus"

export default function AuthenticationForm(): ReactElement {
  const status = useAppSelector((state) => state.authentication.status)
  const error = useAppSelector((state) => state.authentication.error)

  const dispatch = useAppDispatch()

  const [isRegistering, setIsRegistering] = useState(false)

  const [name, setName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)

  const [isFeedbackActive, setIsFeedbackActive] = useState(false)

  const authenticate = async (): Promise<boolean> => {
    if (isRegistering && name !== null && email !== null && password !== null) {
      await dispatch(signUp({ name, email, password }))
    } else if (email !== null && password !== null) {
      await dispatch(signIn({ email, password }))
    } else {
      setIsFeedbackActive(true)
    }

    return status === AuthenticationStatus.authenticated
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Stack spacing={2} marginTop={3}>
        <Collapse in={isRegistering}>
          <RequiredTextField
            activate={isFeedbackActive}
            label="Your Name"
            autoComplete="name"
            setValidValue={setName}
          />
        </Collapse>

        <RequiredTextField
          activate={isFeedbackActive}
          label="Email"
          type="email"
          autoComplete="email"
          setValidValue={setEmail}
          validate={(email) => !isRegistering || /^\S+@\S+\.\S+$/.test(email)}
          invalidMessage="Invalid email"
        />

        <RequiredTextField
          activate={isFeedbackActive}
          label="Password"
          type="password"
          autoComplete={isRegistering ? "new-password" : "current-password"}
          setValidValue={setPassword}
          validate={(password) => !isRegistering || password.length > 5}
          invalidMessage="At least 6 characters"
        />

        <AsyncButton
          variant="contained"
          label={isRegistering ? "Sign Up" : "Sign in"}
          action={authenticate}
        />

        <ErrorFeedback isError={status === AuthenticationStatus.failed} message={error ?? ""} />

        <Button
          variant="text"
          size="small"
          onClick={() => {
            setIsRegistering(!isRegistering)
          }}
        >
          <Typography variant="caption">
            {isRegistering ? "Already registered? Sign in" : "No account yet? Sign up"}
          </Typography>
        </Button>
      </Stack>
    </Box>
  )
}
