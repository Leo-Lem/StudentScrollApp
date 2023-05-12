import { ReactElement } from "react";
import { Binding } from "../../shared/useBinding";
import RequiredTextField from "../../shared/components/RequiredTextField";

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