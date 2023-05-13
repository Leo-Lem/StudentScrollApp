import { Card, CardProps } from "@mui/material"
import { ReactElement } from "react"

export default function SecondaryCard({ ...props }: Props): ReactElement {
  return <Card {...props} sx={{ padding: 1, ...props.sx }} elevation={1} />
}

type Props = CardProps
