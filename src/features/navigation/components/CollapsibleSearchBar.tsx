import { Box, Collapse, ToggleButton } from "@mui/material"
import { Fragment, useState } from "react"

import { Label } from "../../../components"
import SearchBar from "../../search/components/SearchBar"

export default function CollapsibleSearchBar() {
  const [isShowingSearch, setIsShowingSearch] = useState(false)

  return (
    <Fragment>
      <Collapse in={isShowingSearch} orientation="horizontal">
        <Box width="30vw">
          <SearchBar />
        </Box>
      </Collapse>

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
