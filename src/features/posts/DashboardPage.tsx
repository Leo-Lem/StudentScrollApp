import { type ReactElement } from "react"

import { Grid } from "@mui/material"
import CreatePostPanel from "./components/PostCreationPanel"
import PostsScroll from "./components/PostsScroll"

export default function DashboardPage(): ReactElement {
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
