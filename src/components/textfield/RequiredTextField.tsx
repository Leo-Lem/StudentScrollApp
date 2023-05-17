import { TextField } from "@mui/material"
import { type TextFieldProps } from "@mui/material/TextField"
import { type ReactElement, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { Binding } from "../../lib/useBinding"

export default function RequiredTextField({
  $value,
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
    } else if ($value.get === "invalid") {
      setIsEmpty(true)
      setIsInvalid(false)
    }
  }, [$value.get])

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
      onChange={({ target: { value: v } }) => {
        setValue(value)

        if (v === "") {
          setIsEmpty(true)
          setIsInvalid(false)
          $value.set("invalid")
        } else if (validate !== undefined && !validate(v)) {
          setIsEmpty(false)
          setIsInvalid(true)
          $value.set("invalid")
        } else {
          setIsEmpty(false)
          setIsInvalid(false)
          $value.set(v)
        }
      }}
    />
  )
}

interface Props {
  $value: Binding<string | "invalid" | undefined>
  validate?: (value: string) => boolean
  invalidMessage?: string | null
}
