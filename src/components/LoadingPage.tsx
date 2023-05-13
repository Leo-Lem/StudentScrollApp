import { Box, CircularProgress } from "@mui/material";
import { ReactElement } from "react";

export default function LoadingPage(): ReactElement {
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  )
}