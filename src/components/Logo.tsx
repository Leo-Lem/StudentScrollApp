import SchoolIcon from "@mui/icons-material/School"
import { Stack, Typography } from "@mui/material"

export default function Logo({ compact, iconOnly, size: sizeProp }: Props) {
  const size = sizeProp ?? "60%"

  if (compact ?? false)
    return (
      <Stack direction="column" alignItems="center">
        <SchoolIcon sx={{ fontSize: `calc(${size} * 5)` }} />
        {!(iconOnly ?? false) && (
          <Typography variant="subtitle1" fontSize={size}>
            StudentScroll
          </Typography>
        )}
      </Stack>
    )
  else
    return (
      <Stack direction="row" alignItems="center" gap={1}>
        <SchoolIcon sx={{ fontSize: `calc(${size} * 5)` }} />
        {!(iconOnly ?? false) && (
          <Typography variant="h1" fontSize={`calc(${size} * 3)`}>
            StudentScroll
          </Typography>
        )}
      </Stack>
    )
}

interface Props {
  compact?: boolean
  iconOnly?: boolean
  size?: string
}
