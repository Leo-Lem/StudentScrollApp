import { useTranslation } from "react-i18next"

import { RequiredTextField } from "../../../components"
import { type Binding } from "../../../lib/hooks"

export default function EmailTextField({ $email, validate }: Props) {
  const { t } = useTranslation()

  return (
    <RequiredTextField
      $value={$email}
      validate={(email) => !validate || /^\S+@\S+\.\S+$/.test(email)}
      invalidMessage={t("EMAIL_INVALID")}
      label={t("EMAIL")}
      type="email"
      autoComplete="email"
    />
  )
}

interface Props {
  $email: Binding<string | "invalid" | undefined>
  validate: boolean
}
