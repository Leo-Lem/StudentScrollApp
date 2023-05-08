import { Button, CircularProgress, Grid, Paper, TextField, Typography } from "@mui/material"
import { type ReactElement, useEffect, useState } from "react"
import { Edit, KeyboardArrowLeft, KeyboardArrowRight, Save } from "@mui/icons-material"

import AvatarImage from "../../components/AvatarImage"

import { type Profile } from "../../models"
import { ProfileAPI } from "../../api"

import avatars from "../../res/avatars.json"
import { useAppSelector } from "../../app"

export default function ProfileView({ studentId }: Props): ReactElement {
  const currentStudentId = useAppSelector((state) => state.authentication.studentId)

  const [profile, setProfile] = useState<Profile | null>(null)

  const [isEditing, setIsEditing] = useState(false)

  const [newName, setNewName] = useState("")
  const [newBio, setNewBio] = useState("")
  const [newAvatarIndex, setNewAvatarIndex] = useState(0)

  useEffect(() => {
    ProfileAPI.read(studentId)
      .then((profile) => {
        setProfile(profile)
        setNewBio(profile.bio)
        setNewAvatarIndex(avatars.indexOf(profile.icon))
      })
      .catch(console.log)
  }, [])

  const updateProfile = (): void => {
    const name = newName !== "" ? newName : undefined
    const bio = newBio !== "" && newBio !== profile?.bio ? newBio : undefined
    const icon = avatars[newAvatarIndex] !== profile?.icon ? avatars[newAvatarIndex] : undefined

    if (canEdit() && (name !== undefined || bio !== undefined || icon !== undefined)) {
      setProfile(null)
      ProfileAPI.update({ newName: name, newBio: bio, newIcon: icon })
        .then((profile) => {
          setProfile(profile)
          setNewBio(profile.bio)
        })
        .catch(console.log)
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
              if (isEditing) updateProfile()
              setIsEditing(!isEditing)
            }}
          >
            <Save />
          </Button>

          <Grid container direction="row" justifyContent="end" alignSelf="end">
            <Button
              onClick={() => {
                setNewAvatarIndex(
                  (((newAvatarIndex - 1) % avatars.length) + avatars.length) % avatars.length
                )
              }}
            >
              <KeyboardArrowLeft />
            </Button>
            <AvatarImage avatarId={avatars[newAvatarIndex]} />
            <Button
              onClick={() => {
                setNewAvatarIndex((newAvatarIndex + 1) % avatars.length)
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
                if (isEditing) updateProfile()
                setIsEditing(!isEditing)
              }}
            >
              <Edit />
            </Button>
          )}

          <AvatarImage avatarId={profile.icon} />

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
