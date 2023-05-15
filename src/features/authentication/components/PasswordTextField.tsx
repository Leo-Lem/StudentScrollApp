import { ReactElement } from "react"
import { Binding } from "../../../hooks/useBinding"
import { RequiredTextField } from "../../../components"
import { useTranslation } from "react-i18next"

export default function PasswordTextField({
  $password,
  isRegistering,
  showsFeedback,
  onSubmit
}: Props): ReactElement {
  const [t] = useTranslation()

  return (
    <RequiredTextField
      $value={$password}
      showsFeedback={showsFeedback}
      validate={(password) => !isRegistering || password.length > 5}
      invalidMessage={t("PASSWORD_TOO_SHORT")}
      label={t("PASSWORD")}
      type="password"
      autoComplete={isRegistering ? "new-password" : "current-password"}
      onKeyDown={({ key }) => {
        if (key === "Enter") onSubmit()
      }}
    />
  )
}

interface Props {
  $password: Binding<string | "invalid" | undefined>
  isRegistering: boolean
  showsFeedback: boolean
  onSubmit: () => void
}
