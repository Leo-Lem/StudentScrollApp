import { Card, CardProps } from "@mui/material"
import { ReactElement } from "react"

export default function PrimaryCard({ ...props }: CardProps): ReactElement {
  return <Card elevation={2} sx={{ padding: 1, ...props.sx }} {...props} />
}
