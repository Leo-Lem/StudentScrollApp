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

import { ContentPostAPI } from "../api"

import allTags from "../res/tags.json"

export default function CreatePostPanel(): ReactElement {
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [content, setContent] = useState("")

  const [isMissingTitle, setIsMissingTitle] = useState<boolean | null>(null)
  const [isMissingContent, setIsMissingContent] = useState<boolean | null>(null)
  const [isContentTooShort, setIsContentTooShort] = useState<boolean | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [wasSuccess, setWasSuccess] = useState<boolean | null>(null)

  const reset = (): void => {
    setTitle("")
    setTags([])
    setContent("")

    setIsMissingTitle(null)
    setIsMissingContent(null)
    setIsContentTooShort(null)

    setWasSuccess(null)
  }

  const createPost = (): void => {
    if (!validate()) return

    setIsLoading(true)

    ContentPostAPI.create({ title: title.trim(), tags, content: content.trim() })
      .then(() => {
        setWasSuccess(true)
        setTimeout(reset, 1000)
      })
      .catch((e) => {
        console.error(e)
        setWasSuccess(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const validate = (): boolean => {
    if (isMissingTitle === null) setIsMissingTitle(true)

    if (isMissingContent === null) setIsMissingContent(true)
    else if (isContentTooShort === null) setIsContentTooShort(true)

    return !((isMissingTitle ?? true) || (isMissingContent ?? true) || (isContentTooShort ?? true))
  }

  return (
    <Paper elevation={2}>
      <Stack spacing={1} padding={1}>
        <TextField
          fullWidth
          placeholder="New Post"
          value={title}
          onChange={({ target: { value } }) => {
            setTitle(value)
            setIsMissingTitle(value.trim() === "")
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
            setIsContentTooShort(value.trim().length < 3)
          }}
          error={(isMissingContent ?? false) || (isContentTooShort ?? false)}
          helperText={
            isMissingContent ?? false
              ? "Required"
              : (isContentTooShort ?? false) && "Please elaborate…"
          }
        />
        <LoadingButton
          variant="contained"
          fullWidth
          startIcon={wasSuccess ?? false ? <CheckCircle /> : <Send />}
          onClick={createPost}
          color={!(wasSuccess ?? true) ? "error" : "primary"}
          loading={isLoading}
          disabled={wasSuccess ?? false}
        >
          Post
        </LoadingButton>
      </Stack>
    </Paper>
  )
}
