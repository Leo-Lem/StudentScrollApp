import { Button, Link } from "@mui/material"
import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../redux"

import ProfileBadge from "./ProfileBadge"
import { readProfile } from "../redux"

export default function ProfileLink({ studentId, disabled }: Props) {
  const profile = useAppSelector((state) => state.profiles[studentId])

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (profile === undefined) void dispatch(readProfile(studentId))
  }, [])

  return (
    <Button
      color="inherit"
      component={Link}
      disabled={disabled ?? false}
      href={`/profile/${studentId}`}
      sx={{ padding: 0, borderRadius: 100 }}
    >
      <ProfileBadge profile={profile} />
    </Button>
  )
}

interface Props {
  studentId: number
  disabled?: boolean
}
