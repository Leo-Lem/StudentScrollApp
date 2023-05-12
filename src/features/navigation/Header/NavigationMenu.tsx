import { Divider, IconButton, Menu } from "@mui/material"
import { Fragment, ReactElement, useState } from "react"
import { AccountBox, Chat, DynamicFeed, Menu as MenuIcon } from "@mui/icons-material"

import SignOutMenuItem from "./SignOutMenuItem"
import LinkMenuItem from "../../../components/LinkMenuItem"

import { useAppSelector } from "../../../redux"

export default function NavigationMenu(): ReactElement {
  const studentId = useAppSelector((state) => state.authentication.studentId)

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
        <LinkMenuItem href="" startIcon={<DynamicFeed />} dismiss={dismiss}>
          Posts
        </LinkMenuItem>
        <LinkMenuItem href="chats" startIcon={<Chat />} dismiss={dismiss}>
          Chats
        </LinkMenuItem>

        <Divider />

        {studentId !== undefined && (
          <LinkMenuItem href={`/profile/${studentId}`} startIcon={<AccountBox />} dismiss={dismiss}>
            Profile
          </LinkMenuItem>
        )}

        <SignOutMenuItem dismiss={dismiss} />
      </Menu>
    </Fragment>
  )
}
