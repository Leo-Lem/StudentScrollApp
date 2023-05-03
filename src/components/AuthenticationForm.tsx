import { useState, type ReactElement } from "react"

import { Box, Button, Collapse, Stack, TextField, Typography } from "@mui/material"
import { AuthenticationAPI } from "../api"

export default function AuthenticationForm(): ReactElement {
  const [isRegistering, setIsRegistering] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isNameEmpty, setIsNameEmpty] = useState<boolean | null>(null)
  const [isPasswordEmpty, setIsPasswordEmpty] = useState<boolean | null>(null)
  const [isPasswordTooShort, setIsPasswordTooShort] = useState<boolean | null>(null)
  const [isEmailEmpty, setIsEmailEmpty] = useState<boolean | null>(null)
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean | null>(null)

  const [hasSignInFailed, setHasSignInFailed] = useState(false)

  const handleSubmit = async (): Promise<void> => {
    if (!validate(isRegistering))
      return

    if (isRegistering)
      await AuthenticationAPI.signup({ name, email, password })
    else
      await AuthenticationAPI.signup({ name, email, password })
  }

  const validate = (isRegistering: boolean): boolean => {
    if (isRegistering && (isNameEmpty === null))
      setIsNameEmpty(true)

    if (isPasswordEmpty === null)
      setIsPasswordEmpty(true)
    else if (isPasswordTooShort === null)
      setIsPasswordTooShort(true)

    if (isEmailEmpty === null)
      setIsEmailEmpty(true)
    else if (isEmailInvalid === null)
      setIsEmailInvalid(true)

    return (
      (isPasswordEmpty ?? false)
      || (isPasswordTooShort ?? false)
      || (isEmailEmpty ?? false)
      || (isEmailInvalid ?? false)
      || (isRegistering && (isNameEmpty ?? false)))
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Stack spacing={2} marginTop={3}>
        <Collapse in={isRegistering}>
          <TextField
            fullWidth
            label="Your Name"
            autoComplete="name"
            onChange={({ target: { value } }) => {
              const name = value.trim()
              setName(name)
              setIsNameEmpty(name === "")
            }}
            error={isNameEmpty ?? false}
            helperText={(isNameEmpty ?? false) && "Required"}
          />
        </Collapse>

        <TextField
          fullWidth
          label="Email"
          autoComplete="email"
          onChange={({ target: { value } }) => {
            const email = value.trim()
            setEmail(email)
            setIsEmailEmpty(value === "")
            setIsEmailInvalid(!value.match(/^\S+@\S+\.\S+$/))
          }}
          error={(isEmailEmpty ?? false) || (isEmailInvalid ?? false)}
          helperText={(isEmailEmpty ?? false) ? "Required" : ((isEmailInvalid ?? false) && "Invalid email")}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          autoComplete="new-password"
          onChange={({ target: { value } }) => {
            setPassword(value)
            setIsPasswordEmpty(value === "")
            if (password.length > 6) setIsPasswordTooShort(value.length < 6)
          }}
          error={isPasswordTooShort ?? false}
          helperText={(isPasswordEmpty ?? false) ? "Required" : ((isPasswordTooShort ?? false) && "At least 6 characters")}
        />
        <Button fullWidth variant="contained" onClick={handleSubmit}>
          {isRegistering ? "Sign Up" : "Sign in"}
        </Button>

        <Typography variant="caption" color="error" hidden={!hasSignInFailed}>
          Sign in failed. Please try again.
        </Typography>

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
