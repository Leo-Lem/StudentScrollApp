import { Collapse, Typography } from "@mui/material"

export default function ErrorFeedback({ isError, message }: Props) {
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
