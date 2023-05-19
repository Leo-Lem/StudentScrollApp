import { ReactElement, ReactNode, useEffect } from "react"
import { useTranslation } from "react-i18next"

import useAppSelector from "../../lib/hooks/useAppSelector"

export default function AppLocaleProvider({ children }: Props) {
  const [, i18n] = useTranslation()
  const locale = useAppSelector((state) => state.student?.settings?.locale)

  useEffect(() => {
    if (locale === undefined || locale === "system")
      i18n.changeLanguage(navigator.language.split("-")[0])
    else i18n.changeLanguage(locale)
  }, [locale])

  return children as ReactElement
}

interface Props {
  children: ReactNode
}
