import { type ReactElement } from "react"
import { Box, Grid } from "@mui/material"

import CreatePostPanel from "./components/CreatePostMenu"
import PostsScroll from "./components/PostsScroll"
import DismissableCreatePostMenu from "./components/DismissableCreatePostMenu"

import useIsCompact from "../../hooks/useIsCompact"

export default function DashboardPage(): ReactElement {
  const isCompact = useIsCompact()

  if (isCompact)
    return (
      <Box>
        <PostsScroll />
        <DismissableCreatePostMenu />
      </Box>
    )
  else
    return (
      <Grid container direction="row" spacing={1}>
        <Grid item xs={8}>
          <PostsScroll />
        </Grid>

        <Grid item xs position="sticky" bottom={10} alignSelf="end">
          <CreatePostPanel />
        </Grid>
      </Grid>
    )
}
