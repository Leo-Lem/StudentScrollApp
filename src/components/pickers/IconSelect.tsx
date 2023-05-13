import { ReactElement, useEffect, useState } from "react";

import { Binding } from "../../hooks/useBinding";

import { icons } from "../../res"
import { Button, Grid } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { ProfileIcon } from "..";
import useIsCompact from "../../hooks/useIsCompact";

export default function IconSelect({ $icon }: Props): ReactElement {
  const [iconIndex, setIconIndex] = useState(icons.indexOf($icon.get))

  const isCompact = useIsCompact()

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

      <ProfileIcon
        fontSize="large"
        sx={{ fontSize: isCompact ? "max(30vw, 30vh)" : "max(15vw, 15vh)", aspectRatio: 1 }}
        iconId={icons[iconIndex]}
      />

      <Button onClick={selectNext} >
        <KeyboardArrowRight />
      </Button>
    </Grid>
  )
}

interface Props {
  $icon: Binding<string>
}