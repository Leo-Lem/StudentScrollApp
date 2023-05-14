import { ReactElement, createElement, useEffect, useState } from "react"

import { Binding } from "../../hooks/useBinding"

import { Button, Grid } from "@mui/material"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import { Icon, icons } from "../../res/icons"

export default function IconSelect({ $icon }: Props): ReactElement {
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
    <Grid container direction="row" justifyContent="inherit">
      <Button onClick={selectPrevious}>
        <KeyboardArrowLeft />
      </Button>

      {createElement(Icon[icons[iconIndex]], {
        sx: { fontSize: "max(30vw, 30vh)", aspectRatio: 1 }
      })}

      <Button onClick={selectNext}>
        <KeyboardArrowRight />
      </Button>
    </Grid>
  )
}

interface Props {
  $icon: Binding<string>
}
