import { Fragment, type ReactElement } from "react"
import { Grid, Typography } from "@mui/material"

import useIsCompact from "../../../../hooks/useIsCompact"
import ProfileLink from "../../../profiles/components/ProfileLink"

import type ContentPost from "../../types/ContentPost"
import DeletePostButton from "./DeletePostButton"
import TagsList from "./TagsList"
import { SecondaryCard } from "../../../../components"

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
    <SecondaryCard>
      <Grid container direction="row">
        <Grid item xs={9} md={11} gap={1}>
          {isCompact ? compact : regular}
        </Grid>

        <Grid item xs={3} md={1}>
          <ProfileLink studentId={posterId} />
        </Grid>
      </Grid>
    </SecondaryCard>
  )
}

interface Props {
  post: ContentPost
}
