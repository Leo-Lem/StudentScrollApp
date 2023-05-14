import { type ReactElement } from "react"
import { Box, Grid, Slide } from "@mui/material"

import CreatePostMenu from "./components/CreatePostMenu"
import PostsScroll from "./components/PostsScroll"

import useIsCompact from "../../hooks/useIsCompact"
import { BindingToggle, PrimaryAction, Label } from "../../components"
import useBinding from "../../hooks/useBinding"

export default function DashboardPage(): ReactElement {
  const isCompact = useIsCompact()

  const $isPosting = useBinding(false)

  const compactPostMenu = (
    <Grid item>
      <PrimaryAction fixed={true}>
        <BindingToggle $isSelected={$isPosting} sx={{ aspectRatio: 1 }}>
          <Label type="post" display="iconOnly" />
        </BindingToggle>
      </PrimaryAction>

      <Slide direction="up" in={$isPosting.get}>
        <Box position="fixed" margin={1} bottom={0} left={0} width="80%" zIndex={1}>
          <CreatePostMenu dismiss={() => $isPosting.set(false)} />
        </Box>
      </Slide>
    </Grid>
  )

  const regularPostMenu = (
    <Grid item md position="sticky" bottom={10} alignSelf="end">
      <CreatePostMenu />
    </Grid>
  )

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={12} md={8}>
        <PostsScroll />
      </Grid>

      {isCompact ? compactPostMenu : regularPostMenu}
    </Grid>
  )
}
