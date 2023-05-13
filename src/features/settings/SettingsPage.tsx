import { ReactElement, useEffect } from "react"
import { Divider, Stack } from "@mui/material"

import useBinding from "../../hooks/useBinding"
import { useAppDispatch, useAppSelector } from "../../redux"
import { ChipDivider, LoadingSpinner } from "../../components"
import useIsCompact from "../../hooks/useIsCompact"

import { readSettings } from "./settingsReducer"
import ThemeSelect from "./components/ThemeSelect"
import LocaleSelect from "./components/LocaleSelect"
import IsLocatedSwitch from "./components/IsLocatedSwitch"
import PrimaryToggle from "../../components/buttons/PrimaryAction"
import { Save } from "@mui/icons-material"

export default function SettingsPage(): ReactElement {
  const settings = useAppSelector((state) => state.settings.settings)
  const dispatch = useAppDispatch()

  const isCompact = useIsCompact()

  const $theme = useBinding("system")

  useEffect(() => {
    dispatch(readSettings()).then(() => {
      if (settings !== undefined) {
        $theme.set(settings.theme)
      }
    })
  }, [])

  if (settings === undefined)
    return <LoadingSpinner />
  else
    return (
      <Stack direction="column" gap={1}>
        <ChipDivider label="Theme" />
        <ThemeSelect $theme={$theme} />
        <ChipDivider label="Language" />
        <LocaleSelect />

        <Divider />

        <Stack direction="row">
          <ChipDivider label="Use location?" />
          <IsLocatedSwitch />
        </Stack>

        <PrimaryToggle fixed={isCompact}>
          <Save />
        </PrimaryToggle>
      </Stack>
    )
}
