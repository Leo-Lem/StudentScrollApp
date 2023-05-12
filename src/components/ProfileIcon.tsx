import * as Icons from "@mui/icons-material"
import { SvgIconProps } from "@mui/material"
import { type ReactElement } from "react"

// TODO: add more icons

export default function ProfileIcon({ iconId, ...props }: Props): ReactElement {
  switch (iconId) {
    case "AccessibilityNew": return <Icons.AccessibilityNew {...props} />
    case "Blind": return <Icons.Blind {...props} />
    case "ConnectWithoutContact": return <Icons.ConnectWithoutContact {...props} />
    case "ConnectingAirports": return <Icons.ConnectingAirports {...props} />
    case "Diversity2": return <Icons.Diversity2 {...props} />
    case "Graduation cap": return <Icons.School {...props} />
    case "Pencil": return <Icons.Create {...props} />
    case "Backpack": return <Icons.Backpack {...props} />
    case "Book": return <Icons.AutoStories {...props} />
    case "Coffee cup": return <Icons.LocalCafe {...props} />
    case "Campus building": return <Icons.AccountBalance {...props} />
    case "Football": return <Icons.SportsFootball {...props} />
    case "Basketball": return <Icons.SportsBasketball {...props} />
    case "Soccer ball": return <Icons.SportsSoccer {...props} />
    case "Tennis ball": return <Icons.SportsTennis {...props} />
    case "Music note": return <Icons.MusicNote {...props} />
    case "Film reel": return <Icons.Movie {...props} />
    case "Camera": return <Icons.Videocam {...props} />
    case "Paintbrush": return <Icons.Brush {...props} />
    case "Globe": return <Icons.Public {...props} />
    case "Anchor": return <Icons.Anchor {...props} />
    case "Star": return <Icons.Star {...props} />
    default: return <Icons.Person {...props} />
  }
}

type Props = SvgIconProps & {
  iconId: string
}
