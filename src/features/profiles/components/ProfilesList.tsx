import { Chip, Grid } from "@mui/material"

import { ProfileLink } from ".."
import { LoadingSpinner } from "../../../components"

export default function ProfilesList({ studentIds, label, showCount, display }: Props) {
  const wrap = display === "scroll" ? "nowrap" : "wrap"
  const overflow = display === "scroll" ? "scroll" : "hidden"

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item container justifyContent="space-between">
        <Chip label={label} />

        {studentIds === undefined ? (
          <LoadingSpinner />
        ) : (
          (showCount ?? true) && <Chip label={studentIds.length} />
        )}
      </Grid>

      <Grid item container spacing={1} wrap={wrap} overflow={overflow} paddingY={1}>
        {studentIds === undefined ? (
          <Grid item xs={2}>
            <LoadingSpinner />
          </Grid>
        ) : (
          studentIds.map((id) => (
            <Grid item xs={2} key={id}>
              <ProfileLink studentId={id} />
            </Grid>
          ))
        )}
      </Grid>
    </Grid>
  )
}

interface Props {
  studentIds?: number[]
  label: string
  showCount?: boolean
  display: "scroll" | "wrap"
}
