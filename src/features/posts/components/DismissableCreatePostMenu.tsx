import { Send } from "@mui/icons-material"
import { Box, Card, Slide } from "@mui/material"
import { Fragment, ReactElement } from "react"

import CreatePostMenu from "./CreatePostMenu"
import BindingToggle from "../../../components/buttons/BindingToggle"
import useBinding from "../../../hooks/useBinding"

export default function DismissableCreatePostMenu(): ReactElement {
  const $isPosting = useBinding(false)

  return (
    <Fragment>
      <Card elevation={20} sx={{ position: "fixed", margin: 1, bottom: 0, right: 0 }}>
        <BindingToggle $isSelected={$isPosting} sx={{ aspectRatio: 1 }}>
          <Send />
        </BindingToggle>
      </Card>

      <Slide direction="up" in={$isPosting.get}>
        <Box position="fixed" margin={1} bottom={0} left={0} width="80%" zIndex={1}>
          <CreatePostMenu dismiss={() => $isPosting.set(false)} />
        </Box>
      </Slide>
    </Fragment>
  )
}
