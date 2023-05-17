import { Box, Chip } from "@mui/material"
import { ReactElement, ReactNode } from "react"

import Label from "../../components/Label"
import { LabelType } from "../../res/labels"

export default function addPageChip(type: LabelType, page: ReactNode): ReactElement {
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
