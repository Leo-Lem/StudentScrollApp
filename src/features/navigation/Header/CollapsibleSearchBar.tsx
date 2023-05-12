import { Box, Collapse, ToggleButton } from "@mui/material"
import { useState, type ReactElement, Fragment } from "react"
import { Search } from "@mui/icons-material"

import SearchBar from "../../search/components/SearchBar"

export default function CollapsibleSearchBar(): ReactElement {
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
        <Search />
      </ToggleButton>
    </Fragment>
  )
}
