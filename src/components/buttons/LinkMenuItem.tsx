import { ButtonProps, Link, MenuItem } from "@mui/material"

export default function LinkMenuItem({ href, children, startIcon, dismiss }: Props & ButtonProps) {
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
