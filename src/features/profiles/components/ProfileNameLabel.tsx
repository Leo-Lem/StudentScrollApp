import { Paper, Typography } from "@mui/material"

export default function ProfileNameLabel({ name }: Props) {
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
