import { ReactElement } from "react"
import { Binding } from "../../shared/useBinding"
import RequiredTextField from "../../shared/components/RequiredTextField"

export default function EmailTextField({ $email, validate, showsFeedback }: Props): ReactElement {
  return (
    <RequiredTextField
      $value={$email}
      showsFeedback={showsFeedback}
      validate={(email) => !validate || /^\S+@\S+\.\S+$/.test(email)}
      invalidMessage="Invalid email"
      label="Email"
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
