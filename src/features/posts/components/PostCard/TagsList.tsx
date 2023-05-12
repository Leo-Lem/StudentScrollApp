import { Chip, Grid } from "@mui/material"
import { ReactElement } from "react"

export default function TagsList({ tags }: Props): ReactElement {
  return (
    <Grid container direction="row" overflow="scroll" gap={1} wrap="nowrap">
      {tags.map((tag) => (
        <Chip label={tag} key={tag} />
      ))}
    </Grid>
  )
}

interface Props {
  tags: string[]
}
