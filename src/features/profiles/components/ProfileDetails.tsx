import { Grid, Typography } from "@mui/material"

import { useIsCompact } from "../../../lib/hooks"
import { PrimaryAction } from "../../../components"

import { FollowButton } from "../../following"
import Profile from "../types/Profile"
import ProfileIcon from "./ProfileIcon"

export default function ProfileDetails({ followId, profile }: Props) {
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
        {followId !== undefined && (
          <PrimaryAction
            fixed={isCompact}
            sx={isCompact ? {} : { position: "absolute", top: 0, left: 0, margin: 1 }}
          >
            <FollowButton followId={followId} />
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
  profile: Profile
  followId?: number
}
