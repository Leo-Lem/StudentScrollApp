import { Chip, Grid, GridProps } from "@mui/material"
import { Tag } from "../../../../res/tags"

export default function TagsList({ tags, ...props }: Props & GridProps) {
  return (
    <Grid container direction="row" overflow="scroll" gap={1} wrap="nowrap" {...props}>
      {[...tags].sort().map((tag) => (
        <Chip label={tag} key={tag} />
      ))}
    </Grid>
  )
}

interface Props {
  tags: Tag[]
}
