import { ReactElement } from "react"
import { Binding } from "../../../hooks/useBinding"
import { RequiredTextField } from "../../../components"

export default function PasswordTextField({
  $password,
  isRegistering,
  showsFeedback,
  onSubmit
}: Props): ReactElement {
  return (
    <RequiredTextField
      $value={$password}
      showsFeedback={showsFeedback}
      validate={(password) => !isRegistering || password.length > 5}
      invalidMessage="At least 6 characters"
      label="Password"
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
