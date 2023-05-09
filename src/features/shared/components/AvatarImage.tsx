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

export default function AvatarImage({ avatarId }: Props): ReactElement {
  const props: SxProps = { fontSize: 200, alignSelf: "end" }

  switch (avatarId) {
    case "AccessibilityNew":
      return <AccessibilityNew sx={props} />
    case "Blind":
      return <Blind sx={props} />
    case "ConnectWithoutContact":
      return <ConnectWithoutContact sx={props} />
    case "ConnectingAirports":
      return <ConnectingAirports sx={props} />
    case "Diversity2":
      return <Diversity2 sx={props} />
    default:
      return <School sx={props} />
  }
}

interface Props {
  avatarId: string
}
