import { Box, CircularProgress } from "@mui/material"
import { ReactElement } from "react"

export default function LoadingSpinner(): ReactElement {
  return (
    <Box alignSelf="center" display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  )
}
