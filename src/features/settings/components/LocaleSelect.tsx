import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

import { Binding } from "../../../lib/useBinding"
import { useTranslation } from "react-i18next"
import { Locale, locales } from "../../../res/locale"

export default function LocaleSelect({ $locale }: Props) {
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
