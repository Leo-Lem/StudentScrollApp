import { Collapse, Typography } from "@mui/material"
import { type ReactElement } from "react"

export default function ErrorFeedback({ isError, message }: Props): ReactElement {
  return (
    <Collapse in={isError} sx={{ textAlign: "center" }}>
      <Typography variant="caption" color="error">
        {message}
      </Typography>
    </Collapse>
  )
}

interface Props {
  isError: boolean
  message: string
}
