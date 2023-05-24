import { MenuItem } from "@mui/material"

import { Label } from "../../../components"
import { useSignOut } from "../../authentication/redux"

export default function SignOutMenuItem({ dismiss }: Props) {
  const signOut = useSignOut()

  return (
    <MenuItem
      onClick={() => {
        signOut()
        dismiss()
      }}
      sx={{ gap: 1 }}
    >
      <Label type="signout" />
    </MenuItem>
  )
}

interface Props {
  dismiss: () => void
}
