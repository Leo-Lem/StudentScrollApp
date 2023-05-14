import { ReactElement } from "react"
import { Binding } from "../../../hooks/useBinding"
import { Card, Stack, Switch, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

export default function IsLocatedSwitch({ $isLocated }: Props): ReactElement {
  const [t] = useTranslation()

  return (
    <Card variant="outlined">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="button">{t("SETTINGS_IS_LOCATED")}</Typography>

        <Switch
          checked={$isLocated.get}
          onChange={(_, newSelection) => {
            if (newSelection !== null) $isLocated.set(newSelection)
          }}
        />
      </Stack>
    </Card>
  )
}

interface Props {
  $isLocated: Binding<boolean>
}
