import { Grid, Typography } from "@mui/material"
import { type ReactElement, useEffect, Fragment, createElement } from "react"

import {
  BindingTextField,
  BindingToggle,
  IconSelect,
  LoadingSpinner,
  PrimaryAction
} from "../../../components"
import { useAppDispatch, useAppSelector } from "../../../redux"

import { readProfile, updateProfile } from "../profileReducer"
import useIsCompact from "../../../hooks/useIsCompact"
import { Icon, IconType } from "../../../res/icons"
import useBinding from "../../../hooks/useBinding"
import { Edit, Save } from "@mui/icons-material"
import Profile from "../types/Profile"

export default function ProfileDetails({ studentId, canEdit }: Props): ReactElement {
  const isCompact = useIsCompact()

  const profile = useAppSelector((state) => state.profiles[studentId])
  const dispatch = useAppDispatch()

  const $isEditing = useBinding(false)

  const $newName = useBinding("")
  const $newBio = useBinding("")
  const $newIcon = useBinding<IconType>("default") // TODO: make this undefined at first, so it does not reset

  useEffect(() => {
    dispatch(readProfile(studentId)).then(() => {
      if (profile !== null) {
        $newBio.set(profile.bio)
        $newIcon.set(profile.icon)
      }
    })
  }, [studentId])

  useEffect(() => {
    if ($isEditing.get) return

    const name = $newName.get !== "" ? $newName.get : undefined
    const bio = $newBio.get !== "" && $newBio.get !== profile?.bio ? $newBio.get : undefined
    const icon = $newIcon.get !== profile?.icon ? $newIcon.get : undefined

    if (name !== undefined || bio !== undefined || icon !== undefined)
      void dispatch(updateProfile({ newName: name, newBio: bio, newIcon: icon }))
  }, [$isEditing.get])

  const details = (profile: Profile) => (
    <Fragment>
      {createElement(Icon[profile.icon], {
        fontSize: "large",
        sx: { fontSize: isCompact ? "max(30vw, 30vh)" : "max(15vw, 15vh)", aspectRatio: 1 }
      })}

      <Grid item xs>
        <Typography noWrap overflow="scroll" textOverflow="ellipsis" variant="h3">
          {profile.name}
        </Typography>
      </Grid>

      <Typography variant="body1" textAlign={isCompact ? "center" : "end"}>
        {profile.bio}
      </Typography>
    </Fragment>
  )

  const editing = (profile: Profile) => (
    <Fragment>
      <IconSelect $icon={$newIcon} />
      <BindingTextField $value={$newName} placeholder={profile.name} fullWidth />
      <BindingTextField $value={$newBio} multiline minRows={4} fullWidth />
    </Fragment>
  )

  if (profile === undefined) return <LoadingSpinner />
  else
    return (
      <Fragment>
        {canEdit && (
          <PrimaryAction fixed={isCompact}>
            <BindingToggle $isSelected={$isEditing} sx={{ aspectRatio: 1 }}>
              {$isEditing.get ? <Save /> : <Edit />}
            </BindingToggle>
          </PrimaryAction>
        )}

        {$isEditing.get ? editing(profile) : details(profile)}
      </Fragment>
    )
}

interface Props {
  studentId: number
  canEdit: boolean
}
