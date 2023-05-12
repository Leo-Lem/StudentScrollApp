import { KeyboardArrowLeft, KeyboardArrowRight, Save } from "@mui/icons-material"
import { Button, Grid, TextField } from "@mui/material"
import { Fragment, ReactElement, useEffect, useState } from "react"

import { ProfileIcon } from "../../../components"
import { Profile } from "../types"
import { useAppDispatch } from "../../../redux"
import { updateProfile } from "../api"
import { icons } from "../../../res"

export default function EditProfileDetails({ profile, stopEditing }: Props): ReactElement {
  const dispatch = useAppDispatch()

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

  const update = (): void => {
    const name = newName !== "" ? newName : undefined
    const bio = newBio !== "" && newBio !== profile?.bio ? newBio : undefined
    const icon = icons[newIconIndex] !== profile?.icon ? icons[newIconIndex] : undefined

    if (name !== undefined || bio !== undefined || icon !== undefined)
      void dispatch(updateProfile({ newName: name, newBio: bio, newIcon: icon }))

    stopEditing()
  }

  return (
    <Fragment>
      <Button variant="contained" sx={{ aspectRatio: 1 }} onClick={update}>
        <Save />
      </Button>

      <Grid container direction="row" justifyContent="end" wrap="nowrap">
        <Button
          onClick={() => {
            setNewIconIndex((((newIconIndex - 1) % icons.length) + icons.length) % icons.length)
          }}
        >
          <KeyboardArrowLeft />
        </Button>

        <ProfileIcon
          fontSize="large"
          sx={{ fontSize: "max(15vw, 15vh)", aspectRatio: 1 }}
          iconId={icons[newIconIndex]}
        />

        <Button
          onClick={() => {
            setNewIconIndex((newIconIndex + 1) % icons.length)
          }}
        >
          <KeyboardArrowRight />
        </Button>
      </Grid>

      <TextField
        fullWidth
        placeholder={profile.name}
        onChange={({ target: { value } }) => {
          setNewName(value)
        }}
      />

      <TextField
        multiline
        fullWidth
        minRows={4}
        value={newBio}
        onChange={({ target: { value } }) => {
          setNewBio(value)
        }}
      />
    </Fragment>
  )
}

interface Props {
  profile: Profile
  stopEditing: () => void
}
