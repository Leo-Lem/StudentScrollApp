import { Box, Chip } from "@mui/material"
import { ReactElement, ReactNode } from "react"

export default function addPageChip(title: string, page: ReactNode): ReactElement {
  return (
    <Box>
      {page}
      <PageChip title={title} />
    </Box>
  )
}

export function PageChip({ title }: Props): ReactElement {
  return (
    <Chip label={title} color="info" sx={{ position: "fixed", margin: 1, bottom: 0, left: 0 }} />
  )
}

interface Props {
  title: string
}
