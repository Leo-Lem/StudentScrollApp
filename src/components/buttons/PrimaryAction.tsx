import { CardProps, Paper } from "@mui/material"

export default function PrimaryAction({ fixed, children, sx, ...props }: Props & CardProps) {
  return (
    <Paper
      elevation={5}
      sx={fixed ? { ...sx, position: "fixed", margin: 1, bottom: 0, right: 0, zIndex: 10 } : sx}
      {...props}
    >
      {children}
    </Paper>
  )
}

interface Props {
  fixed: boolean
}
