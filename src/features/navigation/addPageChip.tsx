import { Box, Chip } from "@mui/material"
import { ReactNode } from "react"

import { Label } from "../../components"
import { LabelType } from "../../res/labels"

export default function addPageChip(type: LabelType, page: ReactNode) {
  return (
    <Box>
      {page}
      <Chip
        color="primary"
        label={<Label type={type} fontSize="small" />}
        sx={{ position: "fixed", margin: 1, bottom: 0, left: 0, zIndex: 10 }}
      />
    </Box>
  )
}
