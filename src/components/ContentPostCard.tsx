import { type ReactElement } from "react"
import { Card, Grid, Typography } from "@mui/material"
import { Delete, School } from "@mui/icons-material"

import { type ContentPost } from "../models"
import { useStudentId } from "../hooks"
import { ContentPostAPI } from "../api"
import AsyncButton from "./simple/AsyncButton"

// TODO replace placeholder profile with button leading to user profile

export default function ContentPostCard({
  post: { id, title, tags, content, posterId }
}: Props): ReactElement {
  const [studentId] = useStudentId()

  const deletePost = async (): Promise<boolean> => {
    try {
      await ContentPostAPI.deleteWith(id)
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  return (
    <Card>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={11} padding={1}>
          <Grid container direction="row" alignItems="center" gap={1}>
            <Typography variant="h4">{title}</Typography>
            {tags.map((tag) => (
              <Card sx={{ padding: 0.5 }} key={tag} elevation={20}>
                {tag}
              </Card>
            ))}
            {studentId !== null && studentId === posterId && (
              <AsyncButton variant="text" label={<Delete color="error" />} action={deletePost} />
            )}
          </Grid>
          <Typography variant="body1">{content}</Typography>
        </Grid>

        <Grid item xs={1} alignItems="center">
          <School fontSize="large" />
          <Typography variant="caption">Student {posterId}</Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

interface Props {
  post: ContentPost
}
