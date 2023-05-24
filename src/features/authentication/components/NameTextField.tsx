import { useTranslation } from "react-i18next"

import { RequiredTextField } from "../../../components"
import { Binding } from "../../../lib/hooks"

export default function NameTextField({ $name }: Props) {
  const [t] = useTranslation()

  return <RequiredTextField $value={$name} label={t("NAME")} autoComplete="name" fullWidth />
}

interface Props {
  $name: Binding<string | "invalid" | undefined>
}
