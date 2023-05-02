import { useState, type ReactElement, useEffect } from "react"

import type ContentPost from "../models/ContentPost"
import { Stack } from "@mui/material"
import ContentPostCard from "./ContentPostCard"
import fetchContentPosts from "../api/fetchContentPosts"

export default function PostsScroll(): ReactElement {
  const [posts, setPosts] = useState<ContentPost[]>([])

  useEffect(() => {
    fetchContentPosts(1)
      .then(posts => { setPosts(posts) })
      .catch(e => { console.log(e) })
  })

  return (
    <Stack spacing={1}>
      {posts.map((post) => (
        <div key={post.id}>
          <ContentPostCard post={post} />
        </div>
      ))}
    </Stack>
  )
}