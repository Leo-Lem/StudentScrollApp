import { MenuItem } from "@mui/material"
import { signOut } from "../../../features/authentication"
import { useAppDispatch } from "../../../redux"
import { ReactElement } from "react"
import { Logout } from "@mui/icons-material"

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
      <Logout />
      Logout
    </MenuItem>
  )
}

interface Props {
  dismiss: () => void
}
