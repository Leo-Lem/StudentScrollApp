import { useState, type ReactElement, useEffect } from "react"
import { FormControlLabel, Stack, Switch, Typography } from "@mui/material"

import ContentPostCard from "./simple/ContentPostCard"

import { type ContentPost } from "../models"
import { ContentPostAPI } from "../api"

export default function PostsScroll(): ReactElement {
  const [page, setPage] = useState(0)
  const [newestFirst, setNewestFirst] = useState(true)
  const [posts, setPosts] = useState<ContentPost[]>([])

  useEffect(() => {
    ContentPostAPI.read(page, newestFirst)
      .then((posts) => {
        setPosts(posts)
        setPage(page + 1)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [newestFirst])

  return (
    <Stack spacing={1}>
      <FormControlLabel
        sx={{ justifyContent: "end" }}
        checked={newestFirst}
        label={<Typography variant="button">Newest first</Typography>}
        control={<Switch onChange={() => { setNewestFirst(!newestFirst) }} />}
      />

      {posts.map((post) => (
        <div key={post.id}>
          <ContentPostCard post={post} />
        </div>
      ))}
    </Stack>
  )
}
