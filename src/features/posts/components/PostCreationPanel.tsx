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
import useBinding from "../../shared/useBinding"

export default function PostCreationPanel(): ReactElement {
  const dispatch = useAppDispatch()

  const [reset, setReset] = useState(false)
  const $title = useBinding<string | "invalid" | undefined>(undefined)
  const [tags, setTags] = useState<string[]>([])
  const $content = useBinding<string | "invalid" | undefined>(undefined)

  const [areRequirementsActive, setAreRequirementsActive] = useState(false)

  const create = async (): Promise<boolean> => {
    if (
      $title.get === undefined
      || $title.get === "invalid"
      || $content.get === undefined
      || $content.get === "invalid"
    ) {
      setAreRequirementsActive(true)
      return false
    }

    await dispatch(createPost({ title: $title.get.trim(), tags, content: $content.get.trim() }))

    setReset(!reset)

    return true
  }

  return (
    <Paper elevation={2}>
      <Stack spacing={1} padding={1}>
        <RequiredTextField
          $value={$title}
          showsFeedback={areRequirementsActive}
          placeholder="New Post"
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
          $value={$content}
          showsFeedback={areRequirementsActive}
          validate={(content) => content.trim().length > 3}
          invalidMessage="Please elaborate…"
          multiline
          minRows={3}
          placeholder="What's on your mind?"
        />

        <AsyncButton
          action={create}
          variant="contained"
          fullWidth
          startIcon={<Send />}
        >
          Post
        </AsyncButton>
      </Stack>
    </Paper>
  )
}
