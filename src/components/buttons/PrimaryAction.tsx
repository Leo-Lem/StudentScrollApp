import { Card } from "@mui/material";
import { ReactElement, ReactNode } from "react";

export default function PrimaryAction({ fixed, children }: Props): ReactElement {
  return (
    <Card elevation={5} sx={fixed
      ? { position: "fixed", margin: 1, bottom: 0, right: 0 }
      : {}
    }>
      {children}
    </Card>
  )
}

type Props = {
  fixed: boolean
  children: ReactNode
}