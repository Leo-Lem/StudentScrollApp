import { Grid, TextField } from "@mui/material"
import { useState, type ReactElement } from "react"

export default function ProfilePage(): ReactElement {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")

  return (
    <Grid container direction="column" > 
<Grid xs={4}>
      <TextField
        fullWidth
        placeholder="name"
        value={name}
        onChange={({ target: { value } }) => {
          const title = value.trim()
          setName(title)
        }}
      />
      </Grid>
      <Grid container direction="column">
      <Grid xs={4}>
      <TextField
        fullWidth
        placeholder="userBio"
        value={bio}
        onChange={({ target: { value } }) => {
          const title = value.trim()
          setBio(title)
        }}
      />
      </Grid>
      
    </Grid>
    </Grid>

  )
}
