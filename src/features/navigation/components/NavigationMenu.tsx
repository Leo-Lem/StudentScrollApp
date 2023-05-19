import { Menu as MenuIcon } from "@mui/icons-material"
import { Divider, IconButton, Menu } from "@mui/material"
import { Fragment, useState } from "react"

import { Label, LinkMenuItem } from "../../../components"

import SignOutMenuItem from "./SignOutMenuItem"

export default function NavigationMenu() {
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
