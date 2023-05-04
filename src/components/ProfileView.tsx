import { Button, CircularProgress, Grid, Paper, TextField, Typography } from "@mui/material"
import { type ReactElement, useEffect, useState } from "react"
import { Edit, KeyboardArrowLeft, KeyboardArrowRight, Save } from "@mui/icons-material"

import AvatarImage from "./simple/AvatarImage"

import { type Profile } from "../models"
import { ProfileAPI } from "../api"

import avatars from "../res/avatars.json"

export default function ProfileView(): ReactElement {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const [newName, setNewName] = useState("")
  const [newBio, setNewBio] = useState("")
  const [newAvatarIndex, setNewAvatarIndex] = useState(0)

  useEffect(() => {
    ProfileAPI.read()
      .then((profile) => {
        setProfile(profile)
        setNewAvatarIndex(avatars.indexOf(profile.icon))
      })
      .catch(console.log)
  }, [])

  const updateProfile = (): void => {
    const name = newName !== "" ? newName : undefined
    const bio = newBio !== "" ? newBio : undefined
    const icon = avatars[newAvatarIndex] !== profile?.icon ? avatars[newAvatarIndex] : undefined

    if (name !== undefined || bio !== undefined || icon !== undefined) {
      setProfile(null)
      ProfileAPI.update({ newName: name, newBio: bio, newIcon: icon })
        .then(setProfile)
        .catch(console.log)
    }
  }

  return (
    <Paper elevation={1}>
      {profile === null
        ? <CircularProgress />
        : <Grid container direction="column" textAlign="end" padding={1} gap={1}>
          <Button
            variant="contained"
            sx={{ aspectRatio: 1, alignSelf: "end" }}
            onClick={() => {
              if (isEditing) updateProfile()
              setIsEditing(!isEditing)
            }}
          >
            {isEditing ? <Save /> : <Edit />}
          </Button>

          {isEditing ? (
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
          ) : (
            <AvatarImage avatarId={profile.icon} />
          )}

          {isEditing ? (
            <TextField
              placeholder={profile.name}
              onChange={({ target: { value } }) => {
                setNewName(value)
              }}
            />
          ) : (
            <Typography variant="h3">{profile.name}</Typography>
          )}

          {isEditing ? (
            <TextField
              multiline
              minRows={4}
              placeholder={profile.bio}
              onChange={({ target: { value } }) => {
                setNewBio(value)
              }}
            />
          ) : (
            <Typography variant="body1" maxWidth={300} alignSelf="end">
              {profile.bio}
            </Typography>
          )}
        </Grid>}
    </Paper>
  )
}
