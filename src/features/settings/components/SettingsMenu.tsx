import { Grid } from "@mui/material"

import { Binding } from "../../../lib/useBinding"
import { Locale } from "../../../res/locale"
import { Theme } from "../../../res/theme"

import Settings from "../types/Settings"
import LocaleSelect from "./LocaleSelect"
import ThemeSelect from "./ThemeSelect"

export default function SettingsMenu({ $settings }: Props) {
  const $theme: Binding<Theme> = {
    get: $settings.get.theme,
    set: (value) => $settings.set({ ...$settings.get, theme: value })
  }
  const $locale: Binding<Locale> = {
    get: $settings.get.locale,
    set: (value) => $settings.set({ ...$settings.get, locale: value })
  }

  return (
    <Grid container direction="column" gap={3}>
      <ThemeSelect $theme={$theme} />
      <LocaleSelect $locale={$locale} />
    </Grid>
  )
}

interface Props {
  $settings: Binding<Settings>
}
