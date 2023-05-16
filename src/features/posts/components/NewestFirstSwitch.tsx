import { ReactElement } from "react"
import { FormControlLabel, Switch, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../redux"

import { useTranslation } from "react-i18next"
import { toggleNewestFirst } from "../redux"

export default function NewestFirstSwitch(): ReactElement {
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
