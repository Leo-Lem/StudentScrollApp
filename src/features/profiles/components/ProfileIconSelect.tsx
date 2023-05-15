import { ReactElement, useEffect, useState } from "react"
import { Button, Grid } from "@mui/material"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"

import { Binding } from "../../../hooks/useBinding"
import { Icon, IconType, icons as iconsWithDefault } from "../../../res/icons"
import ProfileIcon from "./ProfileIcon"

const icons = iconsWithDefault.filter((icon) => icon !== "default")

export default function ProfileIconSelect({ $icon }: Props): ReactElement {
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
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="inherit"
      wrap="nowrap"
      gap={1}
    >
      <Grid item xs={2}>
        <Button onClick={selectPrevious} sx={{ aspectRatio: 1, borderRadius: "100%" }}>
          <KeyboardArrowLeft />
        </Button>
      </Grid>

      <Grid item xs={6}>
        <ProfileIcon icon={icons[iconIndex] ?? Icon.default} />
      </Grid>

      <Grid item xs={2}>
        <Button onClick={selectNext} sx={{ aspectRatio: 1, borderRadius: "100%" }}>
          <KeyboardArrowRight />
        </Button>
      </Grid>
    </Grid>
  )
}

interface Props {
  $icon: Binding<IconType>
}
