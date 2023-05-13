import { Stack, Typography } from "@mui/material"
import { type ReactElement } from "react"
import ChipDivider from "../../components/ChipDivider"

export default function Footer(): ReactElement {
  return (
    <Stack direction="column" spacing={1}>
      <ChipDivider label="About" />

      <Typography
        variant="h6"
        fontStyle="italic"
        fontSize="0.8em"
        textAlign="center"
        textOverflow="ellipsis"
        overflow="scroll"
        noWrap
      >
        Developed by Eve Tyler, Jessica Wong, Glenn Neil, Chaoyang Wang, Leopold Lemmermann
      </Typography>
    </Stack>
  )
}
