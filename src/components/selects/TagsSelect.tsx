import { Box, Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { ReactElement } from "react"

import { tags } from "../../res/tags"
import { Binding } from "../../hooks/useBinding"

export default function TagsSelect({ $tags: $selection }: Props): ReactElement {
  return (
    <FormControl fullWidth>
      <InputLabel>Tags</InputLabel>
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
  $tags: Binding<string[]>
}