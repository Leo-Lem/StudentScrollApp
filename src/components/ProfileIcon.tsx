import {
  AccessibilityNew,
  Blind,
  ConnectWithoutContact,
  ConnectingAirports,
  Diversity2,
  School
} from "@mui/icons-material"
import { SvgIconProps } from "@mui/material"
import { type ReactElement } from "react"

// TODO: add more icons

export default function ProfileIcon({ iconId, ...props }: Props): ReactElement {
  switch (iconId) {
    case "AccessibilityNew":
      return <AccessibilityNew {...props} />
    case "Blind":
      return <Blind {...props} />
    case "ConnectWithoutContact":
      return <ConnectWithoutContact {...props} />
    case "ConnectingAirports":
      return <ConnectingAirports {...props} />
    case "Diversity2":
      return <Diversity2 {...props} />
    default:
      return <School {...props} />
  }
}

type Props = SvgIconProps & {
  iconId: string
}
