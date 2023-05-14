import { ReactElement } from "react"

import { Binding } from "../../../hooks/useBinding"
import { RequiredTextField } from "../../../components"
import { useTranslation } from "react-i18next"

export default function EmailTextField({ $email, validate, showsFeedback }: Props): ReactElement {
  const [t] = useTranslation()

  return (
    <RequiredTextField
      $value={$email}
      showsFeedback={showsFeedback}
      validate={(email) => !validate || /^\S+@\S+\.\S+$/.test(email)}
      invalidMessage={t("INVALID_EMAIL")}
      label={t("EMAIL")}
      type="email"
      autoComplete="email"
    />
  )
}

interface Props {
  $email: Binding<string | "invalid" | undefined>
  validate: boolean
  showsFeedback: boolean
}
