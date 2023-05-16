import { ToggleButton, ToggleButtonProps } from "@mui/material"
import { ReactElement } from "react"
import { Binding } from "../../lib/useBinding"

export default function BindingToggle({
  $isSelected,
  ...props
}: Props & Omit<ToggleButtonProps, "value">): ReactElement {
  return (
    <ToggleButton
      {...props}
      value={$isSelected.get}
      selected={$isSelected.get}
      onChange={() => $isSelected.set(!$isSelected.get)}
    />
  )
}

interface Props {
  $isSelected: Binding<boolean>
}
