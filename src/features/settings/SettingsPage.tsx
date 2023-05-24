import { Card } from "@mui/material"

import { LoadingSpinner } from "../../components"

import { useSettings, useUpdateSettings } from "../student"
import SettingsMenu from "./components/SettingsMenu"
import Settings from "./types/Settings"

export default function SettingsPage() {
  const settings = useSettings()
  const updateSettings = useUpdateSettings()

  const $settings = (unwrapped: Settings) => ({
    get: unwrapped,
    set: (newSettings: Settings) => {
      const newTheme = newSettings.theme !== unwrapped.theme ? newSettings.theme : undefined
      const newLocale = newSettings.locale !== unwrapped.locale ? newSettings.locale : undefined

      if (newTheme !== undefined || newLocale !== undefined)
        void updateSettings(newTheme, newLocale)
    }
  })

  return (
    <Card elevation={3}>
      {settings === undefined ? (
        <LoadingSpinner />
      ) : (
        <SettingsMenu $settings={$settings(settings)} />
      )}
    </Card>
  )
}
