import { useMediaQuery } from "@mui/material"

export default function useIsCompact(): boolean {
  return !useMediaQuery("(min-width:900px)")
}
