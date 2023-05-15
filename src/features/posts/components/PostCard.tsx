import { type ReactElement } from "react"
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

  return (
    <Card elevation={2}>
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item xs={9} sm={10} md={10} gap={1}>
          <Stack direction="column" spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <DeletePostButton postId={id} posterId={posterId} />

              <Grid item maxWidth="90%">
                <Typography variant="h4" noWrap textOverflow="ellipsis">
                  {title}
                </Typography>
              </Grid>

              {!isCompact && <TagsList tags={tags} />}
            </Stack>

            {isCompact && <TagsList tags={tags} />}

            <Divider />

            <Typography variant="body1">{content}</Typography>
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
