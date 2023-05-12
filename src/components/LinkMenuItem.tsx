import { ButtonProps, Link, MenuItem } from "@mui/material"
import { ReactNode, type ReactElement } from "react"

export default function LinkMenuItem({ href, children, startIcon, dismiss }: Props): ReactElement {
  return (
    <MenuItem href={href} component={Link} onClick={dismiss} sx={{ gap: 1 }}>
      {startIcon}
      {children}
    </MenuItem>
  )
}

type Props = ButtonProps & {
  href: string
  children: ReactNode
  dismiss?: () => void
}
