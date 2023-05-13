import { ReactElement } from "react"
import { Binding } from "../../../hooks/useBinding"
import { Card, Stack, Switch, Typography } from "@mui/material"

export default function IsLocatedSwitch({ $isLocated }: Props): ReactElement {
  return (
    <Card variant="outlined" sx={{ padding: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="button">Use location</Typography>

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