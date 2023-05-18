import { Stack } from "@mui/material"
import { useTranslation } from "react-i18next"

import { AsyncButton, RequiredTextField, Label } from "../../../components"
import { useAppDispatch } from "../../../redux"
import useBinding from "../../../lib/useBinding"

import TagsSelect from "./TagsSelect"
import { createPost } from "../redux"

export default function CreatePostMenu({ dismiss }: Props) {
  const [t] = useTranslation()
  const dispatch = useAppDispatch()

  const $title = useBinding<string | "invalid" | undefined>(undefined)
  const $tags = useBinding<string[]>([])
  const $content = useBinding<string | "invalid" | undefined>(undefined)

  const create = async (): Promise<boolean> => {
    if (
      $title.get === undefined ||
      $title.get === "invalid" ||
      $content.get === undefined ||
      $content.get === "invalid"
    ) {
      if ($title.get === undefined) $title.set("invalid")

      if ($content.get === undefined) $content.set("invalid")

      return false
    }

    await dispatch(
      createPost({ title: $title.get.trim(), tags: $tags.get, content: $content.get.trim() })
    )

    $title.set(undefined)
    $tags.set([])
    $content.set(undefined)

    if (dismiss !== undefined) dismiss()

    return true
  }

  return (
    <Stack spacing={1}>
      <RequiredTextField $value={$title} placeholder={t("POST_TITLE") ?? ""} />

      <TagsSelect $tags={$tags} />

      <RequiredTextField
        $value={$content}
        validate={(content) => content.trim().length > 3}
        invalidMessage={t("POST_CONTENT_TOO_SHORT")}
        multiline
        minRows={4}
        placeholder={t("POST_CONTENT") ?? ""}
      />

      <AsyncButton action={create} variant="contained" fullWidth>
        <Label type="post" />
      </AsyncButton>
    </Stack>
  )
}

interface Props {
  dismiss?: () => void
}
