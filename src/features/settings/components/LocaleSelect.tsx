import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material"
import { ReactElement } from "react"
import { Binding } from "../../../hooks/useBinding"
import { useTranslation } from "react-i18next"
import { Locale, locales } from "../../../res/locale"

export default function LocaleSelect({ $locale }: Props): ReactElement {
  const [t] = useTranslation()

  return (
    <FormControl>
      <InputLabel>{t("SETTINGS_LOCALE")}</InputLabel>
      <Select
        value={$locale.get}
        onChange={({ target: { value } }) => {
          if (value !== null) $locale.set(value as Locale)
        }}
        renderValue={(locale) => t(`LOCALE_${locale.toUpperCase()}`)}
      >
        {locales.map((locale) => (
          <MenuItem key={locale} value={locale}>
            {t(`LOCALE_${locale.toUpperCase()}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

interface Props {
  $locale: Binding<Locale>
}