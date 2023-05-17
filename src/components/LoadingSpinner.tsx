import { Box, CircularProgress } from "@mui/material"

export default function LoadingSpinner() {
  return (
    <Box alignSelf="center" display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  )
}
