import {
  AccessibilityNew,
  Blind,
  ConnectWithoutContact,
  ConnectingAirports,
  Diversity2,
  School
} from "@mui/icons-material"
import { type SxProps } from "@mui/material"
import { type ReactElement } from "react"

// TODO: add more icons

export default function ProfileIcon({ sx, iconId }: Props): ReactElement {
  switch (iconId) {
    case "AccessibilityNew":
      return <AccessibilityNew sx={sx} />
    case "Blind":
      return <Blind sx={sx} />
    case "ConnectWithoutContact":
      return <ConnectWithoutContact sx={sx} />
    case "ConnectingAirports":
      return <ConnectingAirports sx={sx} />
    case "Diversity2":
      return <Diversity2 sx={sx} />
    default:
      return <School sx={sx} />
  }
}

interface Props {
  sx?: SxProps
  iconId: string
}
