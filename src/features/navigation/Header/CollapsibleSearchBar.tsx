import { Box, Collapse, ToggleButton } from "@mui/material"
import { useState, type ReactElement, Fragment } from "react"

import SearchBar from "../../search/components/SearchBar"
import { Label } from "../../../components"

export default function CollapsibleSearchBar(): ReactElement {
  const [isShowingSearch, setIsShowingSearch] = useState(false)

  return (
    <Fragment>
      <Collapse in={isShowingSearch} orientation="horizontal">
        {/* TODO: make this take up all available width */}
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
