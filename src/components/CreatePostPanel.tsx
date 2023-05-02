import { useState, type ReactElement } from "react"

import { Button, Container, Stack, TextField } from "@mui/material"
import { createContentPost } from "../api"
import { useId, useJwt } from "../hooks"

export default function CreatePostPanel(): ReactElement {
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [content, setContent] = useState("")

  const [jwt] = useJwt()
  const [posterId] = useId()

  const createPost = async (): Promise<void> => {
    setTags(["Example"])

    if (jwt !== null && posterId !== null)
      await createContentPost(jwt, posterId, title, tags, content)
    else console.log("Failed to authenticate user")
  }

  return (
    <Container>
      <Stack direction="column" spacing={1}>
        <TextField
          variant="standard"
          placeholder="New Post"
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <TextField
          multiline
          rows={10}
          placeholder="What's on your mind?"
          onChange={(e) => {
            setContent(e.target.value)
          }}
        />
        <Button variant="contained" onClick={createPost}>
          Create Post
        </Button>
      </Stack>
    </Container>
  )
}
