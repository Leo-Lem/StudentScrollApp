import { Paper, Typography } from "@mui/material"
import { ReactElement } from "react"

export default function ProfileNameLabel({ name }: Props): ReactElement {
  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Typography variant="caption" textTransform="capitalize" noWrap marginX={0.5}>
        {name}
      </Typography>
    </Paper>
  )
}

interface Props {
  name: string
}
