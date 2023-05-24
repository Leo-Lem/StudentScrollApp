import { Grid, Typography } from "@mui/material"

import { PrimaryAction } from "../../../components"
import { useIsCompact } from "../../../lib/hooks"

import Profile from "../types/Profile"
import ProfileIcon from "./ProfileIcon"
import FollowButton from "./following/FollowButton"

export default function ProfileDetails({ profile }: Props) {
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
        <PrimaryAction
          fixed={isCompact}
          sx={isCompact ? {} : { position: "absolute", top: 0, left: 0, margin: 1 }}
        >
          <FollowButton followId={profile.studentId} />
        </PrimaryAction>
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
  profile: Profile
}
