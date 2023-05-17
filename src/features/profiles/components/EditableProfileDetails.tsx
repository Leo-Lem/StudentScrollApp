import { type ReactElement, useEffect } from "react"

import { Box } from "@mui/material"
import { Edit, Save } from "@mui/icons-material"

import { useAppDispatch } from "../../../redux"
import { BindingToggle, PrimaryAction } from "../../../components"
import useIsCompact from "../../../lib/useIsCompact"

import useBinding from "../../../lib/useBinding"
import ProfileDetails from "./ProfileDetails"

import { updateProfile } from "../redux"
import EditProfileMenu from "./EditProfileMenu"
import Profile from "../types/Profile"

export default function EditableProfileDetails({ profile }: Props): ReactElement {
  const isCompact = useIsCompact()

  const dispatch = useAppDispatch()

  const $isEditing = useBinding(false)
  const $profile = useBinding(profile)

  useEffect(() => {
    if (profile !== undefined) $profile.set({ ...profile, name: "" })
  }, [profile])

  useEffect(() => {
    const newProfile = $profile.get

    if (!$isEditing.get && profile !== undefined && newProfile !== undefined) {
      const newName =
        newProfile.name !== "" && newProfile.name !== profile.name ? newProfile.name : undefined
      const newBio = newProfile.bio !== profile.bio ? newProfile.bio : undefined
      const newIcon = newProfile.icon !== profile.icon ? newProfile.icon : undefined

      if (newName !== undefined || newBio !== undefined || newIcon !== undefined)
        void dispatch(updateProfile({ newName, newBio, newIcon }))
    }
  }, [$isEditing.get])

  return (
    <Box
      width="100%"
      position="relative"
      justifyContent={isCompact ? "center" : "end"}
      textAlign={isCompact ? "center" : "end"}
    >
      <PrimaryAction
        fixed={isCompact}
        sx={isCompact ? {} : { position: "absolute", top: 0, left: 0, zIndex: 10 }}
      >
        <BindingToggle $isSelected={$isEditing} sx={{ aspectRatio: 1 }}>
          {$isEditing.get ? <Save /> : <Edit />}
        </BindingToggle>
      </PrimaryAction>

      {$isEditing.get && $profile.get !== undefined ? (
        <EditProfileMenu $profile={$profile} name={profile.name} />
      ) : (
        <ProfileDetails profile={profile} />
      )}
    </Box>
  )
}

interface Props {
  profile: Profile
}
