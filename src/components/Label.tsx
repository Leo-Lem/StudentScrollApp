import { Stack, SvgIconProps } from "@mui/material"
import { Fragment, ReactElement, createElement } from "react"
import { useTranslation } from "react-i18next"

import { LabelIcon, LabelType } from "../res/labels"

export default function Label({ type, display, ...props }: Props & SvgIconProps): ReactElement {
  const [t] = useTranslation()

  switch (display) {
    case "iconOnly":
      return createElement(LabelIcon[type], props)
    case "labelOnly":
      return <Fragment>{t(type.toUpperCase())}</Fragment>
    default:
      return (
        <Stack direction="row" gap={1} alignItems="center">
          {createElement(LabelIcon[type], props)}
          {t(type.toUpperCase())}
        </Stack>
      )
  }
}

interface Props {
  type: LabelType
  display?: "iconOnly" | "labelOnly"
}
