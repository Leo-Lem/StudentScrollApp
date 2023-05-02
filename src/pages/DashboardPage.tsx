import { type ReactElement } from "react"

import { Box } from "@mui/material"
import CreatePostPanel from "../components/CreatePostPanel"

export default function DashboardPage(): ReactElement {
  return (
    <Box>
      <CreatePostPanel />
    </Box>
  )
}
