import { Stack, Typography } from "@mui/material"
import { ReactElement } from "react"

import ProfileIcon from "../../profiles/components/ProfileIcon"

export default function ChatsDisplayUser({ name, iconId }: Props): ReactElement {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <ProfileIcon icon={iconId} />
      <Typography variant="button">{name}</Typography>
    </Stack>
  )
}

interface Props {
  name: string
  iconId: string
}
