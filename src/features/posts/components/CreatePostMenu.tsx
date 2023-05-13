import { useState, type ReactElement } from "react"
import { Paper, Stack } from "@mui/material"
import { Send } from "@mui/icons-material"

import { AsyncButton, RequiredTextField, TagsSelect } from "../../../components"
import { useAppDispatch } from "../../../redux"

import { createPost } from "../postsReducer"
import useBinding from "../../../hooks/useBinding"

export default function CreatePostMenu({ dismiss }: Props): ReactElement {
  const dispatch = useAppDispatch()

  const $title = useBinding<string | "invalid" | undefined>(undefined)
  const $tags = useBinding<string[]>([])
  const $content = useBinding<string | "invalid" | undefined>(undefined)

  const [areRequirementsActive, setAreRequirementsActive] = useState(false)

  const create = async (): Promise<boolean> => {
    if (
      $title.get === undefined ||
      $title.get === "invalid" ||
      $content.get === undefined ||
      $content.get === "invalid"
    ) {
      setAreRequirementsActive(true)
      return false
    }

    await dispatch(
      createPost({ title: $title.get.trim(), tags: $tags.get, content: $content.get.trim() })
    )

    setAreRequirementsActive(false)
    $title.set(undefined)
    $tags.set([])
    $content.set(undefined)

    if (dismiss !== undefined) dismiss()

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

        <TagsSelect $tags={$tags} />

        <RequiredTextField
          $value={$content}
          showsFeedback={areRequirementsActive}
          validate={(content) => content.trim().length > 3}
          invalidMessage="Please elaborate…"
          multiline
          minRows={4}
          placeholder="What's on your mind?"
        />

        <AsyncButton action={create} variant="contained" fullWidth startIcon={<Send />}>
          Post
        </AsyncButton>
      </Stack>
    </Paper>
  )
}

interface Props {
  dismiss?: () => void
}
