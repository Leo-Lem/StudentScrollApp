import { Box, Slide, ToggleButton } from "@mui/material"
import { Fragment, useState } from "react"

import { Label } from "../../../components"
import SearchBar from "../../search/SearchBar"

export default function CollapsibleSearchBar() {
  const [isShowingSearch, setIsShowingSearch] = useState(false)

  return (
    <Fragment>
      <Slide in={isShowingSearch} direction="down">
        <Box width="100%">
          <SearchBar />
        </Box>
      </Slide>

      <ToggleButton
        size="small"
        value={isShowingSearch}
        selected={isShowingSearch}
        onClick={() => {
          setIsShowingSearch(!isShowingSearch)
        }}
      >
        <Label type="search" display="iconOnly" />
      </ToggleButton>
    </Fragment>
  )
}
