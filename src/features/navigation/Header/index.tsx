import { type ReactElement } from "react"
import { AppBar, Box, Button, Divider, Stack, Toolbar } from "@mui/material"

import { Logo } from "../../../components"
import SearchBar from "../../search/components/SearchBar"
import AccountMenu from "./AccountMenu"
import HeaderNavigationButtons from "./NavigationButtons"
import NavigationMenu from "./NavigationMenu"
import CollapsibleSearchBar from "./CollapsibleSearchBar"
import useIsCompact from "../../../hooks/useIsCompact"

export default function Header(): ReactElement {
  const isCompact = useIsCompact()

  const divider = <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

  if (isCompact)
    return (
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between", gap: 1 }}>
          <Button color="inherit" size="large" href="/">
            <Logo compact size="max(1.5vw, 1.5vh)" />
          </Button>

          <Stack direction="row" justifyContent="end" alignItems="center" gap={1} flexGrow={1}>
            <CollapsibleSearchBar />
            <NavigationMenu />
          </Stack>
        </Toolbar>
      </AppBar>
    )
  else
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Button color="inherit" size="large" href="/">
            <Logo size="max(1vw, 1vh)" />
          </Button>

          <Box flexGrow={1} />

          <HeaderNavigationButtons />

          {divider}

          <Box width="20%" marginX={1}>
            <SearchBar />
          </Box>

          {divider}

          <AccountMenu />
        </Toolbar>
      </AppBar>
    )
}
