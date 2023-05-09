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

export default function AvatarImage({ sx, avatarId }: Props): ReactElement {
  switch (avatarId) {
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
  avatarId: string
}
