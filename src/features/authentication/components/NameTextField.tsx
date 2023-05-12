import { ReactElement } from "react"

import { Binding } from "../../../hooks/useBinding"
import { RequiredTextField } from "../../../components"

export default function NameTextField({ $name, showsFeedback }: Props): ReactElement {
  return (
    <RequiredTextField
      $value={$name}
      showsFeedback={showsFeedback}
      label="Your Name"
      autoComplete="name"
    />
  )
}

interface Props {
  $name: Binding<string | "invalid" | undefined>
  showsFeedback: boolean
}
