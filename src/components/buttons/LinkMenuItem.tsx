import { ButtonProps, Link, MenuItem } from "@mui/material"
import { type ReactElement } from "react"

export default function LinkMenuItem({
  href,
  children,
  startIcon,
  dismiss
}: Props & ButtonProps): ReactElement {
  return (
    <MenuItem href={href} component={Link} onClick={dismiss} sx={{ gap: 1 }}>
      {startIcon}
      {children}
    </MenuItem>
  )
}

interface Props {
  dismiss?: () => void
}
