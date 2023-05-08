import { Button, Collapse, Stack, TextField } from "@mui/material"
import { type ReactElement, useState } from "react"
import { type Profile } from "../models"
import { ProfileAPI } from "../api"
import { KeyboardArrowRight } from "@mui/icons-material"

export default function SearchBar(): ReactElement {
  const [studentId, setStudentId] = useState<number | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  const search = (query: string): void => {
    if (isNaN(parseInt(query))) {
      setStudentId(null)
      setProfile(null)
    } else {
      const studentId = parseInt(query)
      setStudentId(studentId)
      ProfileAPI.read(studentId)
        .then(setProfile)
        .catch((e) => {
          console.log(e)
          setProfile(null)
        })
    }
  }

  const goToProfile = (): void => {
    if (studentId !== null && profile !== null) window.location.href = `/profile/${studentId}`
  }

  return (
    <Stack direction="row" spacing={1}>
      <TextField
        variant="standard"
        sx={{ ml: 1, input: { color: "white" } }}
        placeholder="Search"
        onChange={({ target: { value } }) => {
          search(value)
        }}
      />

      <Collapse in={profile !== null} orientation="horizontal">
        <Button variant="contained" onClick={goToProfile} endIcon={<KeyboardArrowRight />}>
          {profile?.name ?? ""}
        </Button>
      </Collapse>
    </Stack>
  )
}
