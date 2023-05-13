import { Stack } from "@mui/material";
import { ReactElement, useEffect } from "react";

import useBinding from "../../hooks/useBinding";
import { useAppDispatch, useAppSelector } from "../../redux";

import ThemeSelect from "./components/ThemeSelect";
import LoadingPage from "../../components/LoadingPage";
import { readSettings } from "./settingsReducer";
import ChipDivider from "../../components/ChipDivider";

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
    return <LoadingPage />
  else
    return (
      <Stack direction="column">
        <ChipDivider label="Theme" />

        <ThemeSelect theme={theme} />
      </Stack >
    )
}