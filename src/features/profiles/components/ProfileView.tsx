import { Button, CircularProgress, Grid, Paper, TextField, Typography } from "@mui/material"
import { type ReactElement, useEffect, useState } from "react"
import { Edit, KeyboardArrowLeft, KeyboardArrowRight, Save } from "@mui/icons-material"

import AvatarImage from "../../shared/components/AvatarImage"

import { useAppDispatch, useAppSelector } from "../../../redux"
import { icons } from "../../../res"
import readProfile from "../api/readProfile"
import updateProfile from "../api/updateProfile"

export default function ProfileView({ studentId }: Props): ReactElement {
  const profile = useAppSelector((state) => state.profiles[studentId] ?? null)
  const currentStudentId = useAppSelector((state) => state.authentication.studentId)

  const dispatch = useAppDispatch()

  const [isEditing, setIsEditing] = useState(false)

  const [newName, setNewName] = useState("")
  const [newBio, setNewBio] = useState("")
  const [newIconIndex, setNewIconIndex] = useState(0)

  useEffect(() => {
    if (profile !== null) {
      setNewName(profile.name)
      setNewBio(profile.bio)
      setNewIconIndex(icons.indexOf(profile.icon))
    }
  }, [profile])

  useEffect(() => {
    dispatch(readProfile(studentId))
  }, [studentId])

  const update = (): void => {
    const name = newName !== "" ? newName : undefined
    const bio = newBio !== "" && newBio !== profile?.bio ? newBio : undefined
    const icon = icons[newIconIndex] !== profile?.icon ? icons[newIconIndex] : undefined

    if (canEdit() && (name !== undefined || bio !== undefined || icon !== undefined)) {
      void dispatch(updateProfile({ newName: name, newBio: bio, newIcon: icon }))
    }
  }

  const canEdit = (): boolean => currentStudentId !== undefined && studentId === currentStudentId

  if (profile === null)
    return (
      <Paper elevation={1} sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Paper>
    )
  else if (canEdit() && isEditing)
    return (
      <Paper elevation={1}>
        <Grid container direction="column" textAlign="end" padding={1} gap={1}>
          <Button
            variant="contained"
            sx={{ aspectRatio: 1, alignSelf: "end" }}
            onClick={() => {
              if (isEditing) update()
              setIsEditing(!isEditing)
            }}
          >
            <Save />
          </Button>

          <Grid container direction="row" justifyContent="end" alignSelf="end">
            <Button
              onClick={() => {
                setNewIconIndex(
                  (((newIconIndex - 1) % icons.length) + icons.length) % icons.length
                )
              }}
            >
              <KeyboardArrowLeft />
            </Button>

            <AvatarImage sx={{ fontSize: "15vw", alignSelf: "end" }} avatarId={icons[newIconIndex]} />

            <Button
              onClick={() => {
                setNewIconIndex((newIconIndex + 1) % icons.length)
              }}
            >
              <KeyboardArrowRight />
            </Button>
          </Grid>

          <TextField
            placeholder={profile.name}
            onChange={({ target: { value } }) => {
              setNewName(value)
            }}
          />

          <TextField
            multiline
            minRows={4}
            value={newBio}
            onChange={({ target: { value } }) => {
              setNewBio(value)
            }}
          />
        </Grid>
      </Paper>
    )
  else
    return (
      <Paper elevation={1}>
        <Grid container direction="column" textAlign="end" padding={1} gap={1}>
          {canEdit() && !isEditing && (
            <Button
              variant="contained"
              sx={{ aspectRatio: 1, alignSelf: "end" }}
              onClick={() => {
                if (isEditing) update()
                setIsEditing(!isEditing)
              }}
            >
              <Edit />
            </Button>
          )}

          <AvatarImage sx={{ fontSize: "20vw", alignSelf: "end" }} avatarId={profile.icon} />

          <Typography variant="h3">{profile.name}</Typography>

          <Typography variant="body1" maxWidth={300} alignSelf="end">
            {profile.bio}
          </Typography>
        </Grid>
      </Paper>
    )
}

interface Props {
  studentId: number
}
