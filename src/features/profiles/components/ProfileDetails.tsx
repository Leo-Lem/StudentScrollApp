import { Button, CircularProgress, Grid, Paper, Typography } from "@mui/material"
import { type ReactElement, useEffect, useState, Fragment } from "react"
import { Edit } from "@mui/icons-material"

import { ProfileIcon } from "../../../components"
import { useAppDispatch, useAppSelector } from "../../../redux"
import readProfile from "../api/readProfile"
import EditProfileDetails from "./EditProfileDetails"
import { Profile } from "../types"

export default function ProfileDetails({ studentId }: Props): ReactElement {
  const profile = useAppSelector((state) => state.profiles[studentId])
  const currentStudentId = useAppSelector((state) => state.authentication.studentId)

  const dispatch = useAppDispatch()

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    dispatch(readProfile(studentId))
  }, [studentId])

  const canEdit = (): boolean => currentStudentId !== undefined && studentId === currentStudentId

  const loading = <CircularProgress sx={{ alignSelf: "center" }} />
  const editing = (profile: Profile) => (
    <EditProfileDetails profile={profile} stopEditing={() => setIsEditing(false)} />
  )
  const details = (profile: Profile) => (
    <Fragment>
      {canEdit() && (
        <Button
          variant="contained"
          sx={{ aspectRatio: 1, alignSelf: "end" }}
          onClick={() => {
            setIsEditing(true)
          }}
        >
          <Edit />
        </Button>
      )}

      <ProfileIcon
        fontSize="large"
        sx={{ fontSize: "max(20vw, 30vh)", aspectRatio: 1, alignSelf: "end" }}
        iconId={profile.icon}
      />

      <Typography variant="h3">{profile.name}</Typography>

      <Typography variant="body1" maxWidth={300} alignSelf="end">
        {profile.bio}
      </Typography>
    </Fragment>
  )

  return (
    <Paper elevation={1} sx={{ display: "flex", justifyContent: "center" }}>
      <Grid container direction="column" textAlign="end" padding={1} gap={1}>
        {profile === undefined ? loading : isEditing ? editing(profile) : details(profile)}
      </Grid>
    </Paper>
  )
}

interface Props {
  studentId: number
}
