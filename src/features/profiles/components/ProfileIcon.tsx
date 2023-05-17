import { Paper, PaperProps } from "@mui/material"
import { ReactElement, createElement } from "react"

import { LoadingSpinner } from "../../../components"
import { Icon, IconType } from "../../../res/icons"

export default function ProfileIcon({ icon, ...props }: PaperProps & Props): ReactElement {
  return (
    <Paper
      {...props}
      elevation={5}
      sx={{
        aspectRatio: 1,
        borderRadius: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...props.sx
      }}
    >
      {icon === undefined ? (
        <LoadingSpinner />
      ) : (
        createElement(Icon[icon] ?? Icon.default, {
          sx: { aspectRatio: 1, padding: 1, width: "100%", height: "100%" }
        })
      )}
    </Paper>
  )
}

interface Props {
  icon?: IconType
}
