import { Card, CardProps } from "@mui/material"
import { ReactElement } from "react"

export default function SecondaryCard({ ...props }: CardProps): ReactElement {
  return <Card {...props} sx={{ padding: 1, ...props.sx }} elevation={1} />
}
