import { ReactElement, createElement, useEffect, useState } from "react"
import { Button, Grid } from "@mui/material"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"

import { Binding } from "../../hooks/useBinding"
import useIsCompact from "../../hooks/useIsCompact"
import { Icon, IconType, icons } from "../../res/icons"

export default function IconSelect({ $icon }: Props): ReactElement {
  const isCompact = useIsCompact()

  const [iconIndex, setIconIndex] = useState(icons.indexOf($icon.get))

  useEffect(() => {
    $icon.set(icons[iconIndex])
  }, [iconIndex])

  const selectPrevious = () => {
    setIconIndex((((iconIndex - 1) % icons.length) + icons.length) % icons.length)
  }

  const selectNext = () => {
    setIconIndex((iconIndex + 1) % icons.length)
  }

  return (
    <Grid container direction="row" justifyContent="inherit" wrap="nowrap">
      <Button onClick={selectPrevious}>
        <KeyboardArrowLeft />
      </Button>

      {createElement(Icon[icons[iconIndex]], {
        fontSize: "large",
        sx: { fontSize: isCompact ? "max(30vw, 30vh)" : "max(15vw, 15vh)", aspectRatio: 1 }
      })}

      <Button onClick={selectNext}>
        <KeyboardArrowRight />
      </Button>
    </Grid>
  )
}

interface Props {
  $icon: Binding<IconType>
}
