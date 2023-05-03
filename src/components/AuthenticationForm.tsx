import { useState, type ReactElement } from "react"

import { Box, Button, Collapse, Stack, Typography } from "@mui/material"
import { AuthenticationAPI } from "../api"
import { LoadingButton } from "@mui/lab"
import ErrorFeedback from "./simple/ErrorFeedback"
import RequiredTextField from "./simple/RequiredTextField"

export default function AuthenticationForm(): ReactElement {
  const [isRegistering, setIsRegistering] = useState(false)

  const [name, setName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)

  const [isRequiredActive, setIsRequiredActive] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [areCredentialsInvalid, setAreCredentialsInvalid] = useState(false)
  const [isEmailTaken, setIsEmailTaken] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)

  const authenticate = (): void => {
    setIsLoading(true)

    if (isRegistering && name !== null && email !== null && password !== null) {
      AuthenticationAPI.signup({ name, email, password })
        .catch((e) => {
          if (e instanceof Error && e.message === "Email taken") setIsEmailTaken(true)
          else setHasFailed(true)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else if (email !== null && password !== null) {
      AuthenticationAPI.signin({ email, password })
        .catch((e) => {
          if (e instanceof Error && e.message === "Invalid credentials")
            setAreCredentialsInvalid(true)
          else setHasFailed(true)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsRequiredActive(true)
      setIsLoading(false)
    }
  }

  const errorMessage = (): string => {
    if (isEmailTaken) return "Email is already registered…"
    else if (areCredentialsInvalid) return "Email or password is wrong…"
    else return "Something went wrong… :("
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Stack spacing={2} marginTop={3}>
        <Collapse in={isRegistering}>
          <RequiredTextField
            activate={isRequiredActive}
            label="Your Name"
            autoComplete="name"
            setValidValue={setName}
          />
        </Collapse>

        <RequiredTextField
          activate={isRequiredActive}
          label="Email"
          autoComplete="email"
          setValidValue={setEmail}
          validate={(email) => /^\S+@\S+\.\S+$/.test(email)}
          invalidMessage="Invalid email"
        />

        <RequiredTextField
          activate={isRequiredActive}
          label="Password"
          autoComplete="password"
          setValidValue={setPassword}
          validate={(password) => password.length > 5}
          invalidMessage="At least 6 characters"
        />

        <LoadingButton variant="contained" fullWidth onClick={authenticate} loading={isLoading}>
          {isRegistering ? "Sign Up" : "Sign in"}
        </LoadingButton>

        <ErrorFeedback isError={hasFailed} message={errorMessage()} />

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
