import { Fragment, type ReactElement } from "react"
import { Card, Grid, Typography } from "@mui/material"

import ProfileLink from "../../../profiles/components/ProfileLink"

import { type ContentPost } from "../../types"
import useIsCompact from "../../../../hooks/useIsCompact"
import DeletePostButton from "./DeletePostButton"
import TagsList from "./TagsList"

export default function PostCard({
  post: { id, title, tags, content, posterId }
}: Props): ReactElement {
  const isCompact = useIsCompact()

  const compact = (
    <Fragment>
      <DeletePostButton postId={id} posterId={posterId} />

      <Grid>
        <Typography noWrap variant="h4">
          {title}
        </Typography>
      </Grid>

      <TagsList tags={tags} />

      <Grid item xs={12}>
        <Typography width="100%" textOverflow="ellipsis" overflow="hidden" variant="body1">
          {content}
        </Typography>
      </Grid>
    </Fragment>
  )

  const regular = (
    <Fragment>
      <Grid container direction="row" wrap="nowrap" gap={1}>
        <DeletePostButton postId={id} posterId={posterId} />

        <Grid>
          <Typography noWrap variant="h4">
            {title}
          </Typography>
        </Grid>

        <TagsList tags={tags} />
      </Grid>

      <Grid item xs={12}>
        <Typography width="100%" textOverflow="ellipsis" overflow="hidden" variant="body1">
          {content}
        </Typography>
      </Grid>
    </Fragment>
  )

  return (
    <Card>
      <Grid container direction="row" padding={1}>
        <Grid item xs={9} sm={11} gap={1}>
          {isCompact ? compact : regular}
        </Grid>

        <Grid item xs={3} sm={1}>
          <ProfileLink studentId={posterId} />
        </Grid>
      </Grid>
    </Card>
  )
}

interface Props {
  post: ContentPost
}
