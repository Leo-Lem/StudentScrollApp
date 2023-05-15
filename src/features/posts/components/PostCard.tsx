import { Fragment, type ReactElement } from "react"
import { Grid, Typography, Card, Divider, Stack } from "@mui/material"

import useIsCompact from "../../../hooks/useIsCompact"
import ProfileLink from "../../profiles/components/ProfileLink"

import type ContentPost from "../types/ContentPost"
import DeletePostButton from "./DeletePostButton"
import TagsList from "./TagsList"

export default function PostCard({
  post: { id, title, tags, content, posterId }
}: Props): ReactElement {
  const isCompact = useIsCompact()

  const compact = (
    <Fragment>
      <Typography noWrap variant="h4">
        {title}
      </Typography>

      <TagsList tags={tags} />

      <Divider />

      <Typography variant="body1" textAlign="center">
        {content}
      </Typography>

      <DeletePostButton postId={id} posterId={posterId} />
    </Fragment>
  )

  const regular = (
    <Fragment>
      <Grid container direction="row" wrap="nowrap" gap={1}>
        <Grid item >
          <Typography noWrap variant="h4">
            {title}
          </Typography>
        </Grid>

        <DeletePostButton postId={id} posterId={posterId} />

        <TagsList tags={tags} />
      </Grid>

      <Divider />

      <Typography variant="body1" textAlign="center">
        {content}
      </Typography>
    </Fragment >
  )

  return (
    <Card elevation={2}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={9} sm={10} md={10} gap={1}>
          <Stack direction="column" spacing={1}>
            {isCompact ? compact : regular}
          </Stack>
        </Grid>

        <Grid item xs={3} sm={2} md={2}>
          <ProfileLink studentId={posterId} />
        </Grid>
      </Grid>
    </Card>
  )
}

interface Props {
  post: ContentPost
}
