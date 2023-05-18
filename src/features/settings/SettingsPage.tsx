import { Card } from "@mui/material"
import { useEffect } from "react"

import { LoadingSpinner } from "../../components"
import { useAppDispatch, useAppSelector } from "../../redux"

import { readSettings, updateSettings } from "../student"
import SettingsMenu from "./components/SettingsMenu"
import Settings from "./types/Settings"

export default function SettingsPage() {
  const settings = useAppSelector((state) => state.student?.settings)
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(readSettings())
  }, [])

  const $settings = (unwrapped: Settings) => ({
    get: unwrapped,
    set: (newSettings: Settings) => {
      const newTheme = newSettings.theme !== unwrapped.theme ? newSettings.theme : undefined
      const newLocale = newSettings.locale !== unwrapped.locale ? newSettings.locale : undefined

      if (newTheme !== undefined || newLocale !== undefined)
        void dispatch(updateSettings({ newTheme, newLocale }))
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
