import { ReactElement } from "react"
import { FormControlLabel, Switch, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../redux"

import { toggleNewestFirst } from "../postsReducer"

export default function NewestFirstSwitch(): ReactElement {
  const newestFirst = useAppSelector((state) => state.posts.newestFirst)

  const dispatch = useAppDispatch()

  return (
    <FormControlLabel
      sx={{ justifyContent: "end", alignSelf: "end" }}
      checked={newestFirst}
      label={<Typography variant="button">Newest first</Typography>}
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
