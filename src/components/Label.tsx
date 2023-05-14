import { Stack, SvgIconProps } from "@mui/material"
import { Fragment, ReactElement, createElement } from "react"
import { useTranslation } from "react-i18next"

import { LabelIcon, LabelType } from "../res/labels"

export default function Label({ type, display, ...props }: Props & SvgIconProps): ReactElement {
  const [t] = useTranslation()

  const icon = createElement(LabelIcon[type] ?? <></>, props)

  switch (display) {
    case "iconOnly":
      return icon
    case "labelOnly":
      return <Fragment>{t(type.toUpperCase())}</Fragment>
    default:
      return (
        <Stack direction="row" gap={1} alignItems="center">
          {icon}
          {t(type.toUpperCase())}
        </Stack>
      )
  }
}

interface Props {
  type: LabelType
  display?: "iconOnly" | "labelOnly"
}
