import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material"
import { ReactElement } from "react"
import { locales } from "../../../res"
import { Binding } from "../../../hooks/useBinding"
import LocaleLabel from "./LocaleLabel"

export default function LocaleSelect({ $locale }: Props): ReactElement {
  return (
    <FormControl>
      <InputLabel>Language</InputLabel>
      <Select
        value={$locale.get}
        onChange={({ target: { value } }) => {
          $locale.set(value)
        }}
        input={<OutlinedInput label="Tags" />}
        renderValue={(locale) => (
          <LocaleLabel code={locale as string} />
        )}
      >
        {locales.map((locale) => (
          <MenuItem key={locale} value={locale}>
            <LocaleLabel code={locale as string} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

interface Props {
  $locale: Binding<string>
}