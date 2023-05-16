import { MenuItem } from "@mui/material"
import { ReactElement } from "react"

import { useAppDispatch } from "../../../redux"
import { Label } from "../../../components"

import { signOut } from "../../authentication/redux"

export default function SignOutMenuItem({ dismiss }: Props): ReactElement {
  const dispatch = useAppDispatch()

  return (
    <MenuItem
      onClick={() => {
        dispatch(signOut())
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
