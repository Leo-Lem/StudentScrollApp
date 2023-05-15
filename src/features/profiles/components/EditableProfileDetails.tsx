import { type ReactElement, useEffect } from "react"

import { Box, Stack } from "@mui/material"
import { Edit, Save } from "@mui/icons-material"

import { useAppDispatch, useAppSelector } from "../../../redux"
import { BindingTextField, BindingToggle, LoadingSpinner, PrimaryAction } from "../../../components"
import useIsCompact from "../../../hooks/useIsCompact"

import { readProfile, updateProfile } from "../profileReducer"
import { IconType } from "../../../res/icons"
import useBinding from "../../../hooks/useBinding"
import ProfileDetails from "./ProfileDetails"
import ProfileIconSelect from "./ProfileIconSelect"

export default function EditableProfileDetails({ studentId, isSelf }: Props): ReactElement {
  const isCompact = useIsCompact()

  const profile = useAppSelector((state) => state.profiles[studentId])
  const dispatch = useAppDispatch()

  const $isEditing = useBinding(false)

  const $newName = useBinding("")
  const $newBio = useBinding("")
  const $newIcon = useBinding<IconType>("default")

  const update = () => {
    const name = $newName.get !== "" && $newName.get !== profile?.name ? $newName.get : undefined
    const bio = $newBio.get !== "" && $newBio.get !== profile?.bio ? $newBio.get : undefined
    const icon =
      $newIcon.get !== "default" && $newIcon.get !== profile?.icon ? $newIcon.get : undefined

    if (name !== undefined || bio !== undefined || icon !== undefined)
      void dispatch(updateProfile({ newName: name, newBio: bio, newIcon: icon }))
  }

  useEffect(() => {
    dispatch(readProfile(studentId)).then(() => {
      if (profile !== undefined) {
        $newBio.set(profile.bio)
        $newIcon.set(profile.icon)
      }
    })
  }, [studentId])

  useEffect(() => {
    if (profile !== undefined && !$isEditing.get) update()
  }, [$isEditing.get])

  if (profile === undefined) return <LoadingSpinner />
  else
    return (
      <Box width="100%" position="relative">
        {isSelf && (
          <PrimaryAction
            fixed={isCompact}
            sx={isCompact ? {} : { position: "absolute", top: 0, left: 0, zIndex: 10 }}
          >
            <BindingToggle $isSelected={$isEditing} sx={{ aspectRatio: 1 }}>
              {$isEditing.get ? <Save /> : <Edit />}
            </BindingToggle>
          </PrimaryAction>
        )}

        {$isEditing.get ? (
          <Stack direction="column" gap={1} justifyContent={isCompact ? "center" : "end"}>
            <ProfileIconSelect $icon={$newIcon} />

            <BindingTextField $value={$newName} placeholder={profile.name} fullWidth />

            <BindingTextField $value={$newBio} multiline minRows={4} fullWidth />
          </Stack>
        ) : (
          <ProfileDetails studentId={studentId} profile={profile} showFollowButton={!isSelf} />
        )}
      </Box>
    )
}

interface Props {
  studentId: number
  isSelf: boolean
}
