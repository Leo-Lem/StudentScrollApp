import { Chip, Divider, DividerProps } from "@mui/material"
import { ReactElement, ReactNode } from "react"

export default function ChipDivider({ label, ...props }: Props & DividerProps): ReactElement {
  return (
    <Divider variant="fullWidth" {...props}>
      <Chip label={label} />
    </Divider>
  )
}

interface Props {
  label: ReactNode
}
