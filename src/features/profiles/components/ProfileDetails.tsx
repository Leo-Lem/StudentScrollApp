import { ReactElement } from "react"
import { Grid, Typography } from "@mui/material"

import useIsCompact from "../../../lib/useIsCompact"
import { FollowButton } from "../../following"

import ProfileIcon from "./ProfileIcon"
import Profile from "../types/Profile"
import { PrimaryAction } from "../../../components"

export default function ProfileDetails({
  studentId,
  profile,
  showFollowButton
}: Props): ReactElement {
  const isCompact = useIsCompact()

  return (
    <Grid
      container
      justifyContent={isCompact ? "center" : "end"}
      textAlign={isCompact ? "center" : "end"}
      spacing={1}
      position="relative"
      padding={1}
    >
      <Grid item>
        {showFollowButton && (
          <PrimaryAction
            fixed={isCompact}
            sx={isCompact ? {} : { position: "absolute", top: 0, left: 0, margin: 1 }}
          >
            <FollowButton followId={studentId} />
          </PrimaryAction>
        )}
      </Grid>

      <Grid item xs={6}>
        <ProfileIcon icon={profile.icon} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h2" noWrap overflow="scroll" textOverflow="ellipsis">
          {profile.name}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1">{profile.bio}</Typography>
      </Grid>
    </Grid>
  )
}

interface Props {
  studentId: number
  profile: Profile
  showFollowButton: boolean
}
