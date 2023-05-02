import { useState, type ReactElement } from "react"
import {
  Box,
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
import { LoadingButton } from "@mui/lab"
import { CheckCircle, Send } from "@mui/icons-material"

import { createContentPost } from "../api"
import { useId } from "../hooks"

import allTags from "../res/tags.json"

export default function CreatePostPanel(): ReactElement {
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [content, setContent] = useState("")

  const [isMissingTitle, setIsMissingTitle] = useState<boolean | null>(null)
  const [isMissingContent, setIsMissingContent] = useState<boolean | null>(null)
  const [isTooShort, setIsTooShort] = useState<boolean | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [wasSuccess, setWasSuccess] = useState<boolean | null>(null)

  const [posterId] = useId()

  const isNotValidated = (): boolean =>
    (isMissingTitle ?? true) || (isMissingContent ?? true) || (isTooShort ?? true)

  const reset = (): void => {
    setTitle("")
    setTags([])
    setContent("")

    setIsMissingTitle(null)
    setIsMissingContent(null)
    setIsTooShort(null)

    setWasSuccess(null)
  }

  const createPost = async (): Promise<void> => {
    if (isNotValidated()) return
    if (posterId === null) return

    setIsLoading(true)
    try {
      await createContentPost({ title, tags, content: content.trim(), posterId })
      setWasSuccess(true)
      setTimeout(reset, 1000)
    } catch (e) {
      console.error(e)
      setWasSuccess(false)
    }
    setIsLoading(false)
  }

  return (
    <Paper>
      <Stack spacing={1} padding={1}>
        <TextField
          fullWidth
          placeholder="New Post"
          value={title}
          onChange={({ target: { value } }) => {
            const title = value.trim()
            setTitle(title)
            setIsMissingTitle(title === "")
          }}
          error={isMissingTitle ?? false}
          helperText={(isMissingTitle ?? false) && "Required"}
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
          minRows={10}
          placeholder="What's on your mind?"
          value={content}
          onChange={({ target: { value } }) => {
            setContent(value)
            setIsMissingContent(value.trim() === "")
            setIsTooShort(value.trim().length < 3)
          }}
          error={(isMissingContent ?? false) || (isTooShort ?? false)}
          helperText={
            isMissingContent ?? false ? "Required" : (isTooShort ?? false) && "Please elaborate…"
          }
        />
        <LoadingButton
          color={!(wasSuccess ?? true) ? "error" : "primary"}
          loading={isLoading}
          disabled={isNotValidated() || (wasSuccess ?? false)}
          fullWidth
          startIcon={wasSuccess ?? false ? <CheckCircle /> : <Send />}
          variant="contained"
          onClick={createPost}
        >
          Post
        </LoadingButton>
      </Stack>
    </Paper>
  )
}
