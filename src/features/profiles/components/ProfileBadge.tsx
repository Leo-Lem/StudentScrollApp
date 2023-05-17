import { Box } from "@mui/material"
import { ReactElement } from "react"

import Profile from "../types/Profile"
import ProfileNameLabel from "./ProfileNameLabel"
import ProfileIcon from "./ProfileIcon"

export default function ProfileBadge({ profile }: Props): ReactElement {
  return (
    <Box
      padding={0}
      minHeight="50px"
      position="relative"
      borderRadius={100}
      sx={{ aspectRatio: 1 }}
    >
      <ProfileIcon icon={profile?.icon} />

      <Box position="absolute" bottom={0} zIndex={1} width="100%">
        {profile !== undefined && <ProfileNameLabel name={profile.name} />}
      </Box>
    </Box>
  )
}

interface Props {
  profile?: Profile
}
