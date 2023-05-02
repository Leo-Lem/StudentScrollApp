import { type ReactElement } from "react"
import { Card, Grid, Typography } from "@mui/material"
import type ContentPost from "../models/ContentPost"
import { School } from "@mui/icons-material"

// TODO replace placeholder profile with button leading to user profile
export default function ContentPostCard({ post: { title, tags, content, posterId } }: Props): ReactElement {
  return (
    <Card>
      <Grid container direction="row" alignItems="center">
        <Grid xs={11} container direction="column" padding={1}>
          <Grid container direction="row" alignItems="center" gap={1}>
            <Typography variant="h4">{title}</Typography>
            {tags.map(tag => (
              <Card sx={{ padding: 0.5 }} key={tag} elevation={5}>{tag}</Card>
            ))}
          </Grid>
          <Typography variant="body1">{content}</Typography>
        </Grid>

        <Grid container direction="column" xs={1} alignItems="center">
          <School fontSize="large" />
          <Typography variant="caption">Student {posterId}</Typography>
        </Grid>
      </Grid>
    </Card >
  )
}

interface Props {
  post: ContentPost
}