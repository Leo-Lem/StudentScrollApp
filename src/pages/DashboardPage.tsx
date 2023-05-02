import { type ReactElement } from "react"

import { Grid } from "@mui/material"
import CreatePostPanel from "../components/CreatePostPanel"

export default function DashboardPage(): ReactElement {
  return (
    <Grid container direction="row">
      <Grid item xs={8}>Posts</Grid>

      <Grid item xs>
        <CreatePostPanel />
      </Grid>
    </Grid>
  )
}
