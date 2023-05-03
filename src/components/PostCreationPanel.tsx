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
  Stack
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { Send } from "@mui/icons-material"

import { ContentPostAPI } from "../api"

import allTags from "../res/tags.json"
import ErrorFeedback from "./simple/ErrorFeedback"
import RequiredTextField from "./simple/RequiredTextField"

export default function PostCreationPanel(): ReactElement {
  const [title, setTitle] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [content, setContent] = useState<string | null>(null)

  const [areRequirementsActive, setAreRequirementsActive] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [hasFailed, setHasFailed] = useState<boolean>(false)

  const createPost = (): void => {
    if (title === null || content === null) {
      setAreRequirementsActive(true)
      return
    }

    setIsLoading(true)

    ContentPostAPI.create({ title: title.trim(), tags, content: content.trim() })
      .then(() => {
        setTitle(null)
        setTags([])
        setContent(null)
      })
      .catch((e) => {
        console.error(e)
        setHasFailed(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Paper elevation={2}>
      <Stack spacing={1} padding={1}>
        <RequiredTextField
          activate={areRequirementsActive}
          placeholder="New Post"
          setValidValue={setTitle}
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

        <RequiredTextField
          activate={areRequirementsActive}
          multiline
          minRows={10}
          placeholder="What's on your mind?"
          setValidValue={setContent}
          validate={content => content.trim().length > 3}
          invalidMessage="Please elaborate…"
        />

        <ErrorFeedback isError={hasFailed} message={"Something went wrong… :("} />

        <LoadingButton
          variant="contained"
          fullWidth
          startIcon={<Send />}
          onClick={createPost}
          loading={isLoading}
        >
          Post
        </LoadingButton>
      </Stack>
    </Paper>
  )
}
