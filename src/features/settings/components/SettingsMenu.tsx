import { Grid } from "@mui/material"
import { ReactElement } from "react"

import { Binding } from "../../../lib/useBinding"
import { Locale } from "../../../res/locale"
import { Theme } from "../../../res/theme"

import Settings from "../types/Settings"
import ThemeSelect from "./ThemeSelect"
import LocaleSelect from "./LocaleSelect"

export default function SettingsMenu({ $settings }: Props): ReactElement {
  const $theme: Binding<Theme> = {
    get: $settings.get.theme,
    set: (value) => $settings.set({ ...$settings.get, theme: value })
  }
  const $locale: Binding<Locale> = {
    get: $settings.get.locale,
    set: (value) => $settings.set({ ...$settings.get, locale: value })
  }
  // const $isLocated: Binding<boolean> = { get: $settings.get.isLocated, set: (value) => $settings.set({ ...$settings.get, isLocated: value }) }

  return (
    <Grid container direction="column" gap={3}>
      <ThemeSelect $theme={$theme} />
      <LocaleSelect $locale={$locale} />
      {/* <IsLocatedSwitch $isLocated={$isLocated} /> */}
    </Grid>
  )
}

interface Props {
  $settings: Binding<Settings>
}
