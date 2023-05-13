import { Box, CircularProgress } from "@mui/material"
import { ReactElement } from "react"

export default function LoadingSpinner(): ReactElement {
  return (
    <Box
      width="100%"
      height="100%"
      alignSelf="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  )
}
