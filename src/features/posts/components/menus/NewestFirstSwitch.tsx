import { FormControlLabel, Switch, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import { Binding } from "../../../../lib/hooks"

export default function NewestFirstSwitch({ $newestFirst }: Props) {
  const [t] = useTranslation()

  return (
    <FormControlLabel
      sx={{ justifyContent: "end", alignSelf: "end" }}
      checked={$newestFirst.get}
      label={<Typography variant="button">{t("NEWEST_FIRST")}</Typography>}
      control={<Switch onChange={() => $newestFirst.set(!$newestFirst.get)} />}
    />
  )
}

interface Props {
  $newestFirst: Binding<boolean>
}
