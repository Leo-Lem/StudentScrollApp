import { Card, Divider, Grid, Stack, Typography } from "@mui/material"

import { useIsCompact } from "../../../lib/hooks"

import ProfileLink from "../../profiles/components/ProfileLink"
import type ContentPost from "../types/ContentPost"
import DeletePostButton from "./DeletePostButton"
import TagsList from "./TagsList"

export default function PostCard({ post: { id, title, tags, content, posterId } }: Props) {
  const isCompact = useIsCompact()

  return (
    <Card elevation={2}>
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item xs={9} sm={10} md={10} container direction="column" gap={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <DeletePostButton postId={id} posterId={posterId} />

            <Grid item maxWidth={0.9}>
              <Typography variant="h4" noWrap textOverflow="ellipsis">
                {title}
              </Typography>
            </Grid>

            {!isCompact && <TagsList tags={tags} />}
          </Stack>

          {isCompact && <TagsList tags={tags} />}

          <Divider />

          <Typography variant="body1">{content}</Typography>
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
