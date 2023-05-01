import { type ReactElement } from "react"

import SchoolIcon from "@mui/icons-material/School"

export default function Logo({ size }: Props): ReactElement {
  return <SchoolIcon sx={{ fontSize: size }} />
}

interface Props {
  size?: string
}
