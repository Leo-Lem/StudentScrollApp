import { Box, Slide } from "@mui/material"
import { Fragment } from "react"

import ContentPost from "../../types/ContentPost"
import PostCard from "../PostCard"

export default function PostsList({ posts }: Props) {
  return (
    <Fragment>
      {posts.map((post) => (
        <Slide in direction="down" mountOnEnter key={post.id}>
          <Box width="100%">
            <PostCard post={post} />
          </Box>
        </Slide>
      ))}
    </Fragment>
  )
}

interface Props {
  posts: ContentPost[]
}
