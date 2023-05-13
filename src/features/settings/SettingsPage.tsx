import { ReactElement, useEffect } from "react"
import { Button, Divider, Grid, Stack } from "@mui/material"
import { Save } from "@mui/icons-material"

import useBinding from "../../hooks/useBinding"
import { useAppDispatch, useAppSelector } from "../../redux"
import { ChipDivider, LoadingSpinner, PrimaryAction } from "../../components"
import useIsCompact from "../../hooks/useIsCompact"

import { readSettings, updateSettings } from "./settingsReducer"
import ThemeSelect from "./components/ThemeSelect"
import LocaleSelect from "./components/LocaleSelect"
import IsLocatedSwitch from "./components/IsLocatedSwitch"

export default function SettingsPage(): ReactElement {
  const settings = useAppSelector((state) => state.settings.settings)
  const dispatch = useAppDispatch()

  const isCompact = useIsCompact()

  const $theme = useBinding("system")

  useEffect(() => {
    dispatch(readSettings())
  }, [])

  useEffect(() => {
    if (settings !== undefined) {
      $theme.set(settings.theme)
    }
  }, [settings])

  const update = () => {
    const newTheme = $theme.get !== settings?.theme ? $theme.get : undefined

    if (newTheme !== undefined)
      void dispatch(updateSettings({ newTheme }))
  }

  if (settings === undefined)
    return <LoadingSpinner />
  else
    return (
      <Grid container direction="column" gap={1}>
        <ChipDivider label="Theme" />
        <ThemeSelect $theme={$theme} />
        <ChipDivider label="Language" />
        <LocaleSelect />

        <Divider />

        <Stack direction="row">
          <ChipDivider label="Use location?" />
          <IsLocatedSwitch />
        </Stack>

        <PrimaryAction fixed={isCompact} sx={{ alignSelf: "end" }}>
          <Button color="inherit" variant="text" size="large" onClick={update}>
            <Save />
          </Button>
        </PrimaryAction>
      </Grid>
    )
}
