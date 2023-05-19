import { Card, Divider, Stack, Typography } from "@mui/material"
import { Fragment, useEffect } from "react"

import { useAppDispatch, useAppSelector, useStudentId } from "../../../../lib/hooks"
import { LoadingSpinner, NoItemsPlaceholder } from "../../../../components"

import ChatLink from "./ChatLink"
import { readAllChats } from "../../redux"

export default function ChatsList() {
  const dispatch = useAppDispatch()
  const studentId = useStudentId()

  const chats = useAppSelector((state) => state.chats.chats)
  useEffect(() => {
    if (chats === undefined)
      dispatch(readAllChats())
  }, [])

  const render = () => {
    if (chats === undefined) return <LoadingSpinner />
    else if (chats.length < 1) return <NoItemsPlaceholder />
    else return <Stack>
      {chats.map((chat) => (
        <Fragment key={chat.id}>
          <ChatLink chat={chat} />

          {chats.indexOf(chat) !== chats.length - 1 && <Divider />}
        </Fragment>
      ))}
    </Stack>
  }
  return (
    <Card elevation={3}>
      {render()}
    </Card>
  )
}
