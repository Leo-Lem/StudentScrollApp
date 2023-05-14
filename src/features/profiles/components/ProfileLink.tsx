import { Button, Card, Link, Typography } from "@mui/material"
import { ReactElement, createElement, useEffect } from "react"

import { LoadingSpinner } from "../../../components"
import { useAppDispatch, useAppSelector } from "../../../redux"

import Profile from "../types/Profile"
import { readProfile } from "../profileReducer"
import { Icon } from "../../../res/icons"

export default function ProfileLink({ studentId }: Props): ReactElement {
  const profile = useAppSelector((state) => state.profiles[studentId])

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(readProfile(studentId))
  }, [])

  const content = (profile: Profile) => (
    <Button
      color="inherit"
      component={Link}
      href={`/profile/${studentId}`}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      {createElement(Icon[profile.icon], { sx: { width: "100%", height: "100%" } })}

      <Typography maxWidth="100%" noWrap textOverflow="ellipsis" fontSize={10}>
        {profile.name}
      </Typography>
    </Button>
  )

  return <Card elevation={3}>{profile === undefined ? <LoadingSpinner /> : content(profile)}</Card>
}

interface Props {
  studentId: number
}
