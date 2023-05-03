import { useState, type ReactElement } from "react"

import { Box, Button, Collapse, Stack, Typography } from "@mui/material"
import { AuthenticationAPI } from "../api"
import ErrorFeedback from "./simple/ErrorFeedback"
import RequiredTextField from "./simple/RequiredTextField"
import AsyncButton from "./simple/AsyncButton"

export default function AuthenticationForm(): ReactElement {
  const [isRegistering, setIsRegistering] = useState(false)

  const [name, setName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)

  const [isRequiredActive, setIsRequiredActive] = useState(false)

  const [areCredentialsInvalid, setAreCredentialsInvalid] = useState(false)
  const [isEmailTaken, setIsEmailTaken] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)

  const authenticate = async (): Promise<boolean> => {
    try {
      if (isRegistering && name !== null && email !== null && password !== null) {
        await AuthenticationAPI.signup({ name, email, password })
      } else if (email !== null && password !== null) {
        await AuthenticationAPI.signin({ email, password })
      } else {
        setIsRequiredActive(true)
        return false
      }

      return true
    } catch (e) {
      if (e instanceof Error && e.message === "Email taken") setIsEmailTaken(true)
      if (e instanceof Error && e.message === "Invalid credentials") setAreCredentialsInvalid(true)
      else setHasFailed(true)

      return false
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
          type="email"
          autoComplete="email"
          setValidValue={setEmail}
          validate={(email) => !isRegistering || /^\S+@\S+\.\S+$/.test(email)}
          invalidMessage="Invalid email"
        />

        <RequiredTextField
          activate={isRequiredActive}
          label="Password"
          type="password"
          autoComplete={isRegistering ? "new-password" : "current-password"}
          setValidValue={setPassword}
          validate={(password) => !isRegistering || password.length > 5}
          invalidMessage="At least 6 characters"
        />

        <AsyncButton variant="contained" label={isRegistering ? "Sign Up" : "Sign in"} action={authenticate} />

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
