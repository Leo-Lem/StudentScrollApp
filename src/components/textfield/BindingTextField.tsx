import { ReactElement } from "react"
import { Binding } from "../../hooks/useBinding"
import { TextField, TextFieldProps } from "@mui/material"

export default function BindingTextField({ $value, ...props }: Props): ReactElement {
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

type Props = TextFieldProps & {
  $value: Binding<string>
}
