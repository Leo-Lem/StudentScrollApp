import { Box, Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useTranslation } from "react-i18next"

import { Binding } from "../../../../lib/hooks"
import { Tag, tags } from "../../../../res/tags"

export default function TagsSelect({ $tags: $selection, title }: Props) {
  const [t] = useTranslation()

  return (
    <FormControl fullWidth>
      <InputLabel>{t(title)}</InputLabel>
      <Select
        multiple
        value={$selection.get}
        onChange={({ target: { value } }) => {
          $selection.set(typeof value === "string" ? value.split(",") : value)
        }}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, overflowX: "auto" }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {tags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            {tag}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

interface Props {
  $tags: Binding<Tag[]>
  title: string
}
