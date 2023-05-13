import { ToggleButton, ToggleButtonProps } from "@mui/material"
import { ReactElement } from "react"
import { Binding } from "../../hooks/useBinding"

export default function BindingToggle({ $isSelected, ...props }: BindingToggleProps): ReactElement {
  return (
    <ToggleButton
      {...props}
      value={$isSelected.get}
      selected={$isSelected.get}
      onChange={() => $isSelected.set(!$isSelected.get)}
    />
  )
}

export type BindingToggleProps = Omit<ToggleButtonProps, "value"> & {
  $isSelected: Binding<boolean>
}
