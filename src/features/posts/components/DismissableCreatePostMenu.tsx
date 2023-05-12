import { Send } from "@mui/icons-material"
import { Box, Card, Slide, ToggleButton } from "@mui/material"
import { Fragment, ReactElement, useState } from "react"
import CreatePostMenu from "./CreatePostMenu"

export default function DismissableCreatePostMenu(): ReactElement {
  const [isPosting, setIsPosting] = useState(false)

  return (
    <Fragment>
      <Card elevation={20} sx={{ position: "fixed", margin: 1, bottom: 0, right: 0 }}>
        <ToggleButton
          value={isPosting}
          selected={isPosting}
          onChange={() => setIsPosting(!isPosting)}
          sx={{ aspectRatio: 1 }}
        >
          <Send />
        </ToggleButton>
      </Card>

      <Slide direction="up" in={isPosting}>
        <Box position="fixed" margin={1} bottom={0} left={0} width="80%">
          <CreatePostMenu dismiss={() => setIsPosting(false)} />
        </Box>
      </Slide>
    </Fragment>
  )
}
