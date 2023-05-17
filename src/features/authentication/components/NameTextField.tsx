import { Binding } from "../../../lib/useBinding"
import { RequiredTextField } from "../../../components"
import { useTranslation } from "react-i18next"

export default function NameTextField({ $name }: Props) {
  const [t] = useTranslation()

  return <RequiredTextField $value={$name} label={t("NAME")} autoComplete="name" />
}

interface Props {
  $name: Binding<string | "invalid" | undefined>
}
