import { Button, Link } from "@mui/material"
import { ReactElement, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../redux"

import { readProfile } from "../profileReducer"
import ProfileBadge from "./ProfileBadge"

export default function ProfileLink({ studentId }: Props): ReactElement {
  const profile = useAppSelector((state) => state.profiles[studentId])

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(readProfile(studentId))
  }, [])

  return (
    <Button
      color="inherit"
      component={Link}
      href={`/profile/${studentId}`}
      sx={{ padding: 0, borderRadius: 100 }}
    >
      <ProfileBadge profile={profile} />
    </Button>
  )
}

interface Props {
  studentId: number
}
