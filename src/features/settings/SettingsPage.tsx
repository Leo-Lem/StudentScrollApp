import { ReactElement, useEffect } from "react"
import { Card } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../redux"
import { LoadingSpinner } from "../../components"

import Settings from "./types/Settings"
import SettingsMenu from "./components/SettingsMenu"
import { readSettings, updateSettings } from "../student"

export default function SettingsPage(): ReactElement {
  const settings = useAppSelector((state) => state.student?.settings)
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(readSettings())
  }, [])

  const $settings = (settings: Settings) => ({
    get: settings, set: (newSettings: Settings) => {
      const newTheme = newSettings.theme !== settings.theme ? newSettings.theme : undefined
      const newLocale = newSettings.locale !== settings.locale ? newSettings.locale : undefined
      const newIsLocated = newSettings.isLocated !== settings.isLocated ? newSettings.isLocated : undefined

      if (newTheme !== undefined || newLocale !== undefined || newIsLocated !== undefined)
        void dispatch(updateSettings({ newTheme, newLocale, newIsLocated }))
    }
  })

  return (
    <Card elevation={3}>
      {settings === undefined
        ? <LoadingSpinner />
        : <SettingsMenu $settings={$settings(settings)} />}
    </Card>
  )
}
