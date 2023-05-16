import { ReactElement } from "react"
import { Stack } from "@mui/material"

import { Binding } from "../../../lib/useBinding"
import { BindingTextField } from "../../../components"
import { IconType } from "../../../res/icons"

import Profile from "../types/Profile"
import ProfileIconSelect from "./ProfileIconSelect"

export default function EditProfileMenu({ $profile, name }: Props): ReactElement {
  const $newIcon = {
    get: $profile.get.icon,
    set: (newIcon: IconType) => $profile.set({ ...$profile.get, icon: newIcon })
  }
  const $newName = {
    get: $profile.get.name,
    set: (newName: string) => $profile.set({ ...$profile.get, name: newName })
  }
  const $newBio = {
    get: $profile.get.bio,
    set: (newBio: string) => $profile.set({ ...$profile.get, bio: newBio })
  }

  return (
    <Stack direction="column" gap={1} justifyContent="inherit">
      <ProfileIconSelect $icon={$newIcon} />

      <BindingTextField $value={$newName} placeholder={name} fullWidth />

      <BindingTextField $value={$newBio} multiline minRows={4} fullWidth />
    </Stack>
  )
}

interface Props {
  $profile: Binding<Profile>
  name: string
}
