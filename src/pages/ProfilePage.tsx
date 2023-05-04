import { Button, Grid, TextField, Avatar, Box, Stack } from "@mui/material"
import React, { useState, type ReactElement } from "react"

const chooseAvatar = ["https://i.pravatar.cc/150?img=1", "https://i.pravatar.cc/150?img=2"]

export default function ProfilePage(): ReactElement {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")

  return (
    <Box flexDirection="column">
      <Stack spacing={2} margin={5}>
      <Grid xs={10}>
        <TextField
          id="user-name"
          fullWidth
          maxRows={4}
          placeholder="Name"
          value={name}
          onChange={({ target: { value } }) => {
            const title = value.trim()
            setName(title)
          }}
        />
        <Grid container direction="column">
          <Grid xs={10}>
            <TextField
              id="user-bio"
              fullWidth
              maxRows={4}
              placeholder="Bio"
              value={bio}
              onChange={({ target: { value } }) => {
                const title = value.trim()
                setBio(title)
              }}
            />
          </Grid>
          <Grid>
            <Button color="secondary" type="submit" className="{classes.submitButton}">
              SAVE AND UPDATE
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container alignContent={"center"} direction="row" spacing={4}>
        {chooseAvatar.map((avatarLink, index) => (
          <Grid item key={index}>
            <Avatar src={avatarLink} alt={`Avatar ${index}`} style={{ width: 80, height: 80 }} />
          </Grid>
        ))}
      </Grid>
      </Stack>
    </Box>
  )
}
