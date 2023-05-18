import { Box, Grid, Slide, Card, Stack } from "@mui/material"

import CreatePostMenu from "./components/CreatePostMenu"

import useIsCompact from "../../lib/useIsCompact"
import { BindingToggle, PrimaryAction, Label } from "../../components"
import useBinding from "../../lib/useBinding"
import { FollowsList, FollowersList } from "../following"
import ScrollablePostsListWithSwitch from "./components/list/ScrollablePostsListWithSwitch"

export default function DashboardPage() {
  const isCompact = useIsCompact()

  const $isPosting = useBinding(false)

  const createPostMenu = (
    <Card elevation={3}>
      <CreatePostMenu dismiss={() => $isPosting.set(false)} />
    </Card>
  )

  const followsList = (
    <Card elevation={2}>
      <FollowsList />
    </Card>
  )

  const followersList = (
    <Card elevation={2}>
      <FollowersList />
    </Card>
  )

  const postMenuToggle = (
    <PrimaryAction fixed={true}>
      <BindingToggle $isSelected={$isPosting} sx={{ aspectRatio: 1 }}>
        <Label type="post" display="iconOnly" />
      </BindingToggle>
    </PrimaryAction>
  )

  const compactPostMenu = (
    <Grid item>
      {postMenuToggle}

      <Slide direction="up" in={$isPosting.get}>
        <Box position="fixed" margin={1} bottom={0} left={0} width="80%" zIndex={1}>
          {createPostMenu}
        </Box>
      </Slide>
    </Grid>
  )

  const regular = (
    <Grid item md={4} position="sticky" bottom={10} alignSelf="end">
      <Stack direction="column" spacing={1}>
        <Grid item xs>
          {followsList}
        </Grid>
        <Grid item xs>
          {followersList}
        </Grid>
        <Grid item xs>
          {createPostMenu}
        </Grid>
      </Stack>
    </Grid>
  )

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={12} md={8}>
        <ScrollablePostsListWithSwitch />
      </Grid>

      {isCompact ? compactPostMenu : regular}
    </Grid>
  )
}
