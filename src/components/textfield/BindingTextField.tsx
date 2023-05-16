import { ReactElement } from "react"
import { Binding } from "../../lib/useBinding"
import { TextField, TextFieldProps } from "@mui/material"

export default function BindingTextField({
  $value,
  ...props
}: Props & TextFieldProps): ReactElement {
  return (
    <TextField
      {...props}
      value={$value.get}
      onChange={({ target: { value } }) => {
        $value.set(value)
      }}
    />
  )
}

interface Props {
  $value: Binding<string>
}
