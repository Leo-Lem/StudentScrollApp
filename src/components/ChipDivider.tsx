import { Chip, Divider, DividerProps } from "@mui/material"
import { ReactElement } from "react"

export default function ChipDivider({ label, ...props }: Props): ReactElement {
  return (
    <Divider variant="fullWidth" {...props}>
      <Chip label={label} />
    </Divider>
  )
}

type Props = DividerProps & {
  label: string
}
