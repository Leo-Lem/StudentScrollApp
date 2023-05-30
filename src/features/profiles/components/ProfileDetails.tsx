import { Grid, Stack, Typography } from "@mui/material"

import { PrimaryAction } from "../../../components"
import { useIsCompact } from "../../../lib/hooks"

import Profile from "../types/Profile"
import ProfileIcon from "./ProfileIcon"
import FollowButton from "./following/FollowButton"
import { useStudentId } from "../../student"
import ShareButton from "../../../components/ShareButton"
import TagsList from "../../posts/components/lists/TagsList"

export default function ProfileDetails({ profile }: Props) {
  const isCompact = useIsCompact()
  const isSelf = profile.studentId === useStudentId()

  const justify = isCompact ? "center" : "end"

  return (
    <Grid
      container
      justifyContent={justify}
      textAlign={justify}
      spacing={1}
      position="relative"
      padding={1}
    >
      {!isSelf && (
        <Grid item>
          <PrimaryAction
            fixed={isCompact}
            sx={isCompact ? {} : { position: "absolute", top: 0, left: 0, margin: 1 }}
          >
            <FollowButton followId={profile.studentId} />
          </PrimaryAction>
        </Grid>
      )}

      <Grid item xs={6}>
        <ProfileIcon icon={profile.icon} />
      </Grid>

      <Grid item xs={12}>
        <Stack direction="row" gap={1} alignItems="center" justifyContent={justify}>
          <ShareButton title={profile.name} url={`/profile/${profile.studentId}`} />

          <Typography variant="h2" noWrap overflow="scroll" textOverflow="ellipsis">
            {profile.name}
          </Typography>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <TagsList tags={profile.interests} justifyContent={justify} />
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
