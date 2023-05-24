import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"

import Profile from "../types/Profile"
import ProfileNameLabel from "./ProfileNameLabel"
import ProfileIcon from "./ProfileIcon"

export default function ProfileBadge({ profile, isSelf }: Props) {
  const { t } = useTranslation()

  return (
    <Box position="relative" borderRadius={100} sx={{ aspectRatio: 1 }}>
      <ProfileIcon icon={profile?.icon} />

      <Box position="absolute" bottom={0} zIndex={1} width={1}>
        {profile !== undefined && (
          <ProfileNameLabel name={isSelf ?? false ? t("YOU") : profile.name} />
        )}
      </Box>
    </Box>
  )
}

interface Props {
  profile?: Profile
  isSelf?: boolean
}
