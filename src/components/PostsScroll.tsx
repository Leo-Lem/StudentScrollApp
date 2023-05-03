import { useState, type ReactElement, useEffect } from "react"
import { Stack } from "@mui/material"

import ContentPostCard from "./ContentPostCard"

import { type ContentPost } from "../models"
import { ContentPostAPI } from "../api"

export default function PostsScroll(): ReactElement {
  const [posts, setPosts] = useState<ContentPost[]>([])

  useEffect(() => {
    ContentPostAPI.read(1)
      .then((posts) => {
        setPosts(posts)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

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
