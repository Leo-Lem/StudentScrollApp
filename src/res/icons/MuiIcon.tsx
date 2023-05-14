import { ComponentType } from "react"
import * as Icon from "@mui/icons-material"

import { IconType } from "."

export default {
  default: Icon.Person,
  diversity: Icon.AccessibilityNew,
  graduation: Icon.School,
  pencil: Icon.Create,
  backpack: Icon.Backpack,
  book: Icon.AutoStories,
  coffee: Icon.LocalCafe,
  building: Icon.AccountBalance,
  football: Icon.SportsFootball,
  Bnsketball: Icon.SportsBasketball,
  soccer: Icon.SportsSoccer,
  tennis: Icon.SportsTennis,
  music: Icon.MusicNote,
  film: Icon.Movie,
  camera: Icon.Videocam,
  paintbrush: Icon.Brush,
  globe: Icon.Public,
  anchor: Icon.Anchor,
  star: Icon.Star
} as { [key in IconType]: ComponentType<any> }