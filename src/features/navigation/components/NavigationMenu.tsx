import { Divider, IconButton, Menu } from "@mui/material"
import { Fragment, ReactElement, useState } from "react"
import { Menu as MenuIcon } from "@mui/icons-material"

import SignOutMenuItem from "./SignOutMenuItem"
import LinkMenuItem from "../../../components/buttons/LinkMenuItem"

import { Label } from "../../../components"

export default function NavigationMenu(): ReactElement {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)

  const dismiss = (): void => {
    setAnchor(null)
  }

  return (
    <Fragment>
      <IconButton
        size="large"
        onClick={({ currentTarget }) => {
          setAnchor(currentTarget)
        }}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      <Menu anchorEl={anchor} keepMounted open={Boolean(anchor)} onClose={dismiss}>
        <LinkMenuItem href="/" dismiss={dismiss}>
          <Label type="posts" />
        </LinkMenuItem>

        <LinkMenuItem href="/chats" dismiss={dismiss}>
          <Label type="chats" />
        </LinkMenuItem>

        <LinkMenuItem href="/nearby" dismiss={dismiss}>
          <Label type="nearby" />
        </LinkMenuItem>

        <Divider />

        <LinkMenuItem href={"/profile"} dismiss={dismiss}>
          <Label type="profile" />
        </LinkMenuItem>

        <LinkMenuItem href="/settings" dismiss={dismiss}>
          <Label type="settings" />
        </LinkMenuItem>

        <SignOutMenuItem dismiss={dismiss} />
      </Menu>
    </Fragment>
  )
}
