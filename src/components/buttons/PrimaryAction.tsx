import { Card, CardProps } from "@mui/material";
import { ReactElement } from "react";

export default function PrimaryAction({ fixed, children, sx, ...props }: Props & CardProps): ReactElement {
  return (
    <Card
      elevation={5}
      sx={
        fixed
          ? { ...sx, position: "fixed", margin: 1, bottom: 0, right: 0 }
          : sx
      }
      {...props}
    >
      {children}
    </Card >
  )
}

interface Props {
  fixed: boolean
}