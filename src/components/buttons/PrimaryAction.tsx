import { Card, SxProps } from "@mui/material";
import { ReactElement, ReactNode } from "react";

export default function PrimaryAction({ fixed, children, sx }: Props): ReactElement {
  return (
    <Card elevation={5} sx={
      fixed
        ? { ...sx, position: "fixed", margin: 1, bottom: 0, right: 0 }
        : sx
    }>
      {children}
    </Card >
  )
}

type Props = {
  fixed: boolean
  children: ReactNode
  sx?: SxProps
}