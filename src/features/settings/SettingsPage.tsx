import { ReactElement, useEffect } from "react"
import { Grid } from "@mui/material"

import useBinding from "../../hooks/useBinding"
import { useAppDispatch, useAppSelector } from "../../redux"
import { LoadingSpinner, PrimaryCard } from "../../components"

import { readSettings, updateSettings } from "./settingsReducer"
import ThemeSelect from "./components/ThemeSelect"
import LocaleSelect from "./components/LocaleSelect"
import { Theme } from "../../res/theme"
import { Locale } from "../../res/locale"

export default function SettingsPage(): ReactElement {
  const settings = useAppSelector((state) => state.settings.settings)
  const dispatch = useAppDispatch()

  const $theme = useBinding<Theme>(settings?.theme ?? "system")
  const $locale = useBinding<Locale>(settings?.locale ?? "system")
  const $isLocated = useBinding(settings?.isLocated ?? false)

  const update = () => {
    const newTheme = $theme.get !== settings?.theme ? $theme.get : undefined
    const newLocale = $locale.get !== settings?.locale ? $locale.get : undefined
    const newIsLocated = $isLocated.get !== settings?.isLocated ? $isLocated.get : undefined

    if (newTheme !== undefined || newLocale !== undefined || newIsLocated !== undefined)
      void dispatch(updateSettings({ newTheme, newLocale, newIsLocated }))
  }

  useEffect(() => {
    dispatch(readSettings())
  }, [])

  useEffect(() => {
    if (settings !== undefined) {
      $theme.set(settings.theme)
      $locale.set(settings.locale)
      $isLocated.set(settings.isLocated)
    }
  }, [settings])

  useEffect(update, [$theme.get, $locale.get, $isLocated.get])

  return (
    <PrimaryCard>
      {settings === undefined ? (
        <LoadingSpinner />
      ) : (
        <Grid container direction="column" gap={3}>
          <ThemeSelect $theme={$theme} />
          <LocaleSelect $locale={$locale} />
          {/* <IsLocatedSwitch $isLocated={$isLocated} /> */}
        </Grid>
      )}
    </PrimaryCard>
  )
}
