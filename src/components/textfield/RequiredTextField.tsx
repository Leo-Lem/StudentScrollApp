import { TextField } from "@mui/material"
import { type TextFieldProps } from "@mui/material/TextField"
import { type ReactElement, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { Binding } from "../../hooks/useBinding"

export default function RequiredTextField({
  $value,
  showsFeedback,
  validate,
  invalidMessage,
  ...textFieldProps
}: Props & TextFieldProps): ReactElement {
  const [t] = useTranslation()

  const [value, setValue] = useState($value.get === "invalid" ? "" : $value.get ?? "")
  const [isEmpty, setIsEmpty] = useState<boolean | undefined>(undefined)
  const [isInvalid, setIsInvalid] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if ($value.get === undefined) {
      setValue("")
      setIsEmpty(undefined)
      setIsInvalid(undefined)
    }
  }, [$value.get === undefined])

  useEffect(() => {
    if (showsFeedback ?? false) {
      setValue($value.get === "invalid" ? "" : $value.get ?? "")
    } else {
      setIsEmpty(undefined)
      setIsInvalid(undefined)
    }
  }, [showsFeedback ?? false])

  const helperText = (): string | null => {
    if (isEmpty ?? false) return t("REQUIRED")
    else if (isInvalid ?? false) return invalidMessage ?? t("INVALID")
    else return null
  }

  return (
    <TextField
      {...textFieldProps}
      error={(isEmpty ?? false) || (isInvalid ?? false)}
      helperText={helperText()}
      value={value}
      onChange={({ target: { value } }) => {
        setValue(value)

        if (value === "") {
          setIsEmpty(true)
          setIsInvalid(false)
          $value.set("invalid")
        } else if (validate !== undefined && !validate(value)) {
          setIsEmpty(false)
          setIsInvalid(true)
          $value.set("invalid")
        } else {
          setIsEmpty(false)
          setIsInvalid(false)
          $value.set(value)
        }
      }}
    />
  )
}

interface Props {
  $value: Binding<string | "invalid" | undefined>
  showsFeedback?: boolean
  validate?: (value: string) => boolean
  invalidMessage?: string | null
}
