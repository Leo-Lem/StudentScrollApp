import { TextField } from "@mui/material"
import { type TextFieldProps } from "@mui/material/TextField"
import { type SetStateAction, type ReactElement, useState, type Dispatch, useEffect } from "react"

export default function RequiredTextField({ setValidValue, reset, showsFeedback, validate, invalidMessage, ...textFieldProps }: Props): ReactElement {
  const [value, setValue] = useState("")
  const [isEmpty, setIsEmpty] = useState<boolean | null>(null)
  const [isInvalid, setIsInvalid] = useState<boolean | null>(null)

  useEffect(() => {
    if (showsFeedback ?? false) {
      setIsEmpty(value === "")
      if (validate !== undefined) setIsInvalid(!validate(value))
    }
  }, [showsFeedback ?? false])

  useEffect(() => {
    setValidValue(
      (isEmpty ?? true) || (validate !== undefined && (isInvalid ?? true)) ? null : value
    )
  }, [value])

  useEffect(() => {
    setValue("")
  }, [reset])

  const isError = (): boolean => (isEmpty ?? false) || (isInvalid ?? false)

  const helperText = (): string | null => {
    if (isEmpty ?? false) return "Required"
    else if (isInvalid ?? false) return invalidMessage ?? "Invalid value"
    else return null
  }

  return (
    <TextField
      {...textFieldProps}
      error={isError()}
      helperText={helperText()}
      value={value}
      onChange={({ target: { value } }) => {
        setIsEmpty(value === "")
        if (validate !== undefined) setIsInvalid(!validate(value))
        setValue(value)
      }}
    />
  )
}

type Props = TextFieldProps & {
  setValidValue: Dispatch<SetStateAction<string | null>>
  reset?: boolean
  showsFeedback?: boolean
  validate?: (value: string) => boolean
  invalidMessage?: string
}
