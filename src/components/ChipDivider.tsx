import { Chip, Divider } from "@mui/material"
import { ReactElement } from "react"

export default function ChipDivider({ label }: Props): ReactElement {
  return (
    <Divider variant="fullWidth" sx={{ marginTop: 2, marginBottom: 1 }}>
      <Chip label={label} />
    </Divider>
  )
}

interface Props {
  label: string
}
