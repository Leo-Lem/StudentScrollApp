import { Card, CardProps } from "@mui/material"
import { ReactElement } from "react"

export default function PrimaryCard({ ...props }: Props): ReactElement {
  return <Card elevation={3} sx={{ padding: 1, ...props.sx }} {...props} />
}

type Props = CardProps
