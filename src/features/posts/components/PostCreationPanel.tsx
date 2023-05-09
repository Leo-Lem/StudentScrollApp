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
import { Send } from "@mui/icons-material"

import allTags from "../../../res/tags.json"
import RequiredTextField from "../../shared/components/RequiredTextField"
import AsyncButton from "../../shared/components/AsyncButton"
import { useAppDispatch } from "../../../redux"
import { createPost } from ".."

export default function PostCreationPanel(): ReactElement {
  const dispatch = useAppDispatch()

  const [reset, setReset] = useState(false)
  const [title, setTitle] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [content, setContent] = useState<string | null>(null)

  const [areRequirementsActive, setAreRequirementsActive] = useState(false)

  const create = async (): Promise<boolean> => {
    if (title === null || content === null) {
      setAreRequirementsActive(true)
      return false
    }

    await dispatch(createPost({ title: title.trim(), tags, content: content.trim() }))

    setReset(!reset)

    return true
  }

  return (
    <Paper elevation={2}>
      <Stack spacing={1} padding={1}>
        <RequiredTextField
          placeholder="New Post"
          setValidValue={setTitle}
          reset={reset}
          showsFeedback={areRequirementsActive}
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
          multiline
          minRows={10}
          placeholder="What's on your mind?"
          setValidValue={setContent}
          reset={reset}
          showsFeedback={areRequirementsActive}
          validate={(content) => content.trim().length > 3}
          invalidMessage="Please elaborate…"
        />

        <AsyncButton
          variant="contained"
          fullWidth
          startIcon={<Send />}
          label="Post"
          action={create}
        />
      </Stack>
    </Paper>
  )
}
