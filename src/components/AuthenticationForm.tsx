import { useState, type ReactElement } from "react"

import { Box, Button, Collapse, Stack, TextField, Typography } from "@mui/material"

export default function AuthenticationForm({ login, register }: Props): ReactElement {
  const [isRegistering, setIsRegistering] = useState(false)
  const [success, setSuccess] = useState<boolean | undefined>(undefined)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (): Promise<void> => {
    // TODO: validate (not empty, valid email, etc.)

    if (isRegistering) setSuccess(await register(name, email, password))
    else setSuccess(await login(email, password))
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Stack spacing={2} marginTop={3}>
        <Collapse in={isRegistering}>
          <TextField
            fullWidth
            label="Your Name"
            autoComplete="name"
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </Collapse>

        <TextField
          fullWidth
          label="Email Address"
          autoComplete="email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          autoComplete="new-password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />

        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button fullWidth variant="contained" onClick={handleSubmit}>
          {isRegistering ? "Sign Up" : "Sign in"}
        </Button>

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

        {success !== undefined && !success && (
          <Typography variant="body2">Invalid username or password</Typography>
        )}
      </Stack>
    </Box>
  )
}

interface Props {
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
}
