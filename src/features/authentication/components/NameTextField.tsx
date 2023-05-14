import { ReactElement } from "react"

import { Binding } from "../../../hooks/useBinding"
import { RequiredTextField } from "../../../components"
import { useTranslation } from "react-i18next"

export default function NameTextField({ $name, showsFeedback }: Props): ReactElement {
  const [t] = useTranslation()

  return (
    <RequiredTextField
      $value={$name}
      showsFeedback={showsFeedback}
      label={t("NAME")}
      autoComplete="name"
    />
  )
}

interface Props {
  $name: Binding<string | "invalid" | undefined>
  showsFeedback: boolean
}
