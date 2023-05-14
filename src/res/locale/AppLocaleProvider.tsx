import { ReactElement, ReactNode, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { useAppSelector } from "../../redux"

export default function AppLocaleProvider({ children }: Props): ReactElement {
  const [, i18n] = useTranslation()
  const locale = useAppSelector((state) => state.settings.settings?.locale)

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return children as ReactElement
}

interface Props {
  children: ReactNode
}
