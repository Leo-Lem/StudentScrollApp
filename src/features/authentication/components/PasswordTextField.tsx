import { useTranslation } from "react-i18next"
import { RequiredTextField } from "../../../components"
import { Binding } from "../../../lib/hooks"

export default function PasswordTextField({ $password, isRegistering, onSubmit }: Props) {
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
