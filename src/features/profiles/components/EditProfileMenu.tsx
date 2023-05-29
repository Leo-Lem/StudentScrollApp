import { Stack } from "@mui/material"

import { BindingTextField } from "../../../components"
import { Binding } from "../../../lib/hooks"
import { IconType } from "../../../res/icons"

import Profile from "../types/Profile"
import ProfileIconSelect from "./ProfileIconSelect"
import { Tag } from "../../../res/tags"
import TagsSelect from "../../posts/components/menus/TagsSelect"

export default function EditProfileMenu({ $profile, name }: Props) {
  const $newIcon = {
    get: $profile.get.icon,
    set: (newIcon: IconType) => $profile.set({ ...$profile.get, icon: newIcon })
  }
  const $newName = {
    get: $profile.get.name,
    set: (newName: string) => $profile.set({ ...$profile.get, name: newName })
  }
  const $newInterests = {
    get: $profile.get.interests,
    set: (newInterests: Tag[]) => $profile.set({ ...$profile.get, interests: newInterests })
  }
  const $newBio = {
    get: $profile.get.bio,
    set: (newBio: string) => $profile.set({ ...$profile.get, bio: newBio })
  }

  return (
    <Stack direction="column" gap={1} justifyContent="inherit">
      <ProfileIconSelect $icon={$newIcon} />

      <BindingTextField $value={$newName} placeholder={name} fullWidth />

      <TagsSelect $tags={$newInterests} />

      <BindingTextField $value={$newBio} multiline minRows={4} fullWidth />
    </Stack>
  )
}

interface Props {
  $profile: Binding<Profile>
  name: string
}
