import { useState, type ReactElement } from "react"
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField
} from "@mui/material"

import { createContentPost } from "../api"
import { useId, useJwt } from "../hooks"

import allTags from "../res/tags.json"
import { Send } from "@mui/icons-material"

export default function CreatePostPanel(): ReactElement {
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [content, setContent] = useState("")

  const [jwt] = useJwt()
  const [posterId] = useId()

  const createPost = async (): Promise<void> => {
    if (jwt !== null && posterId !== null)
      await createContentPost(jwt, posterId, title, tags, content)
    else console.log("Failed to authenticate user")
  }

  return (
    <Paper>
      <Stack spacing={1} padding={1}>
        <TextField
          fullWidth
          placeholder="New Post"
          onChange={({ target: { value } }) => {
            setTitle(value)
          }}
        />

        <FormControl fullWidth>
          <InputLabel>Tags</InputLabel>
          <Select
            multiple
            value={tags}
            onChange={({ target: { value } }) => {
              setTags(typeof value === "string" ? value.split(",") : value)
            }}
            input={<OutlinedInput label="Tags" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, overflowX: "auto" }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {allTags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          multiline
          rows={10}
          placeholder="What's on your mind?"
          onChange={({ target: { value } }) => {
            setContent(value)
          }}
        />

        <Button
          fullWidth
          startIcon={<Send />}
          sx={{ height: "100%" }}
          variant="contained"
          onClick={createPost}
        >
          Post
        </Button>
      </Stack>
    </Paper>
  )
}
