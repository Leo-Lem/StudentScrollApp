import { FormControlLabel, Switch, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "../../../lib/hooks"

import { toggleNewestFirst } from "../redux"

export default function NewestFirstSwitch() {
  const newestFirst = useAppSelector((state) => state.posts.newestFirst)

  const dispatch = useAppDispatch()

  const [t] = useTranslation()

  return (
    <FormControlLabel
      sx={{ justifyContent: "end", alignSelf: "end" }}
      checked={newestFirst}
      label={<Typography variant="button">{t("NEWEST_FIRST")}</Typography>}
      control={
        <Switch
          onChange={() => {
            dispatch(toggleNewestFirst())
          }}
        />
      }
    />
  )
}
