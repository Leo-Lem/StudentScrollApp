import { ReactElement, useEffect } from "react";
import { Stack } from "@mui/material";

import useBinding from "../../hooks/useBinding";
import { useAppDispatch, useAppSelector } from "../../redux";
import { ChipDivider, LoadingSpinner, PrimaryCard } from "../../components";

import { readSettings } from "./settingsReducer";
import ThemeSelect from "./components/ThemeSelect";

export default function SettingsPage(): ReactElement {
  const settings = useAppSelector((state) => state.settings.settings)

  const dispatch = useAppDispatch()

  const theme = useBinding("system")

  useEffect(() => {
    dispatch(readSettings())
      .then(() => {
        if (settings !== undefined) {
          theme.set(settings.theme)
        }
      })
  }, [])

  if (settings === undefined)
    return <LoadingSpinner />
  else
    return (
      <PrimaryCard>
        <Stack direction="column">
          <ChipDivider label="Theme" />

          <ThemeSelect theme={theme} />
        </Stack >
      </PrimaryCard>
    )
}