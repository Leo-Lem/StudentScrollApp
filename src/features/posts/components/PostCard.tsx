import { Card, CardProps, Divider, Grid, Typography } from "@mui/material"

import { useIsCompact } from "../../../lib/hooks"

import ShareButton from "../../../components/ShareButton"
import ProfileLink from "../../profiles/components/ProfileLink"
import type ContentPost from "../types/ContentPost"
import TagsList from "./lists/TagsList"
import DeletePostButton from "./menus/DeletePostButton"

export default function PostCard({
  post: { id, title, tags, content, posterId },
  ...props
}: Props & CardProps) {
  const isCompact = useIsCompact()

  return (
    <Card elevation={2} {...props}>
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item xs={9} sm={10} md={10} container direction="column" gap={1} overflow="clip">
          <Grid container direction="row" wrap="nowrap" alignItems="center" spacing={1}>
            <Grid item>
              <DeletePostButton postId={id} sx={{ aspectRatio: 1 }} />
            </Grid>

            <Grid item overflow="clip">
              <Typography variant="h4" noWrap>
                {title}
              </Typography>
            </Grid>

            <Grid item>
              <ShareButton title={title} url={`/posts/${id}`} />
            </Grid>

            {!isCompact && (
              <Grid item xs overflow="scroll">
                <TagsList tags={tags} />
              </Grid>
            )}
          </Grid>

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
