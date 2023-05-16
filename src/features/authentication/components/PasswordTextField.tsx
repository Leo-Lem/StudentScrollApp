import { ReactElement } from "react"
import { Binding } from "../../../lib/useBinding"
import { RequiredTextField } from "../../../components"
import { useTranslation } from "react-i18next"

export default function PasswordTextField({
  $password,
  isRegistering,
  onSubmit
}: Props): ReactElement {
  const [t] = useTranslation()

  return (
    <RequiredTextField
      $value={$password}
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
  onSubmit: () => void
}
