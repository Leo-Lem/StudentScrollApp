import { TextField } from "@mui/material"
import { type SetStateAction, type ReactElement, useState, type Dispatch, useEffect } from "react"

export default function RequiredTextField({ activate, fullWidth, multiline, minRows, label, placeholder, autoComplete, setValidValue, validate, invalidMessage }: Props): ReactElement {
  const [value, setValue] = useState("")
  const [isEmpty, setIsEmpty] = useState<boolean | null>(null)
  const [isInvalid, setIsInvalid] = useState<boolean | null>(null)

  useEffect(() => {
    if (activate ?? false) {
      setIsEmpty(value === "")
      if (validate !== undefined) setIsInvalid(!validate(value))
    }
  }, [activate ?? false])

  useEffect(() => {
    setValidValue((isEmpty ?? true) || (validate !== undefined && (isInvalid ?? true)) ? null : value)
  }, [value])

  const isError = (): boolean => (isEmpty ?? false) || (isInvalid ?? false)

  const helperText = (): string | null => {
    if (isEmpty ?? false)
      return "Required"
    else if (isInvalid ?? false)
      return invalidMessage ?? "Invalid value"
    else
      return null
  }

  return (
    <TextField
      fullWidth={fullWidth ?? true}
      multiline={multiline}
      minRows={minRows}
      label={label}
      placeholder={placeholder}
      autoComplete={autoComplete}
      error={isError()}
      helperText={helperText()}
      onChange={({ target: { value } }) => {
        setIsEmpty(value === "")

        if (validate !== undefined)
          setIsInvalid(!validate(value))

        setValue(value)
      }}
    />
  )
}

interface Props {
  activate?: boolean
  fullWidth?: boolean
  multiline?: boolean
  minRows?: number
  label?: string
  placeholder?: string
  autoComplete?: string
  setValidValue: Dispatch<SetStateAction<string | null>>
  validate?: (value: string) => boolean
  invalidMessage?: string
}
