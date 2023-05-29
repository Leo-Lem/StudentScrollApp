import { Chip, Grid } from "@mui/material"

export default function TagsList({ tags }: Props) {
  return (
    <Grid container direction="row" overflow="scroll" gap={1} wrap="nowrap">
      {[...tags].sort().map((tag) => (
        <Chip label={tag} key={tag} />
      ))}
    </Grid>
  )
}

interface Props {
  tags: string[]
}
