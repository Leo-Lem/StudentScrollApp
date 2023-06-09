import { Box, Card, Grid, Slide, Stack } from "@mui/material"

import { BindingToggle, Label, PrimaryAction } from "../../components"
import { useBinding, useIdParam, useIsCompact } from "../../lib/hooks"

import CreatePostMenu from "./components/menus/CreatePostMenu"
import ScrollablePostsListWithSwitch from "./components/lists/ScrollablePostsListWithSwitch"
import FollowersList from "../profiles/components/following/FollowersList"
import FollowsList from "../profiles/components/following/FollowsList"
import HighlightedPost from "./components/HighlightedPost"

export default function DashboardPage() {
  const isCompact = useIsCompact()
  const postId = useIdParam("postId")

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
    <Grid item md={4} position="sticky" top={100} alignSelf="start">
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
        <Slide direction="down" in={postId !== undefined}>
          <Box>{postId !== undefined && <HighlightedPost postId={postId} />}</Box>
        </Slide>
        <ScrollablePostsListWithSwitch />
      </Grid>

      {!isCompact && regular}
      {isCompact && compactPostMenu}
    </Grid>
  )
}
