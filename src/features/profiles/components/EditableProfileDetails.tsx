import { useEffect } from "react"

import { Edit, Save } from "@mui/icons-material"
import { Box } from "@mui/material"

import { BindingToggle, PrimaryAction } from "../../../components"
import { useBinding, useIsCompact } from "../../../lib/hooks"

import useUpdateProfile from "../redux/hooks/useUpdateProfile"
import Profile from "../types/Profile"
import EditProfileMenu from "./EditProfileMenu"
import ProfileDetails from "./ProfileDetails"

export default function EditableProfileDetails({ profile }: Props) {
  const isCompact = useIsCompact()

  const update = useUpdateProfile()

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
      const newInterests =
        newProfile.interests !== profile.interests ? newProfile.interests : undefined
      const newBio = newProfile.bio !== profile.bio ? newProfile.bio : undefined
      const newIcon = newProfile.icon !== profile.icon ? newProfile.icon : undefined

      if (
        newName !== undefined ||
        newBio !== undefined ||
        newInterests !== undefined ||
        newIcon !== undefined
      )
        void update(newName, newBio, newInterests, newIcon)
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
