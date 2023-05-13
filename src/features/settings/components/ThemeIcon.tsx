import { DarkMode, LightMode, Palette, Settings } from "@mui/icons-material"
import { SvgIconProps } from "@mui/material"
import { ReactElement } from "react"

export default function ThemeIcon({ theme, props }: Props): ReactElement {
  switch (theme) {
    case "light":
      return <LightMode {...props} />
    case "dark":
      return <DarkMode {...props} />
    case "colorful":
      return <Palette {...props} />
    case "system":
      return <Settings {...props} />
    default:
      throw new Error(`Unknown theme: ${theme}`)
  }
}

interface Props {
  theme: string
  props?: SvgIconProps
}
