import { useState, type ReactElement } from "react"

import { Box, Button, Collapse, Stack, TextField, Typography } from "@mui/material"
import { useId, useJwt } from "../hooks"

export default function AuthenticationForm(): ReactElement {
  const [isRegistering, setIsRegistering] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [, setJwt] = useJwt()
  const [, setId] = useId()

  const handleSubmit = async (): Promise<void> => {
    // TODO: validate (not empty, valid email, etc.)

    // TODO: register and login
    console.log(name, email, password)

    setJwt("some-token")
    setId(1)
    window.location.href = ""
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
      </Stack>
    </Box>
  )
}
