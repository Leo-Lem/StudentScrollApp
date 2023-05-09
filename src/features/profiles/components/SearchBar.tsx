import { type ReactElement, useState } from "react"
import { Button, Collapse, Stack, TextField } from "@mui/material"
import { KeyboardArrowRight } from "@mui/icons-material"

import { type Profile } from "../types"
import { useAppDispatch, useAppSelector } from "../../../redux"
import readProfile from "../api/readProfile"

export default function SearchBar(): ReactElement {
  const profiles = useAppSelector((state) => state.profiles)

  const dispatch = useAppDispatch()

  const [studentId, setStudentId] = useState<number | null>(null)

  const getProfile = (): Profile | null => {
    if (studentId === null) return null
    return profiles[studentId] ?? null
  }

  const search = (query: string): void => {
    if (isNaN(parseInt(query))) {
      setStudentId(null)
    } else {
      const studentId = parseInt(query)
      setStudentId(studentId)

      dispatch(readProfile(studentId))
    }
  }

  const goToProfile = (): void => {
    // TODO: use client routing
    if (studentId !== null && getProfile() !== null) window.location.href = `/profile/${studentId}`
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

      <Collapse in={getProfile() !== null} orientation="horizontal">
        <Button variant="contained" onClick={goToProfile} endIcon={<KeyboardArrowRight />}>
          {getProfile()?.name ?? ""}
        </Button>
      </Collapse>
    </Stack>
  )
}
