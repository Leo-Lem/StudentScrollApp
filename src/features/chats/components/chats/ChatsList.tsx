import { Card, Divider, Stack } from "@mui/material"
import { Fragment, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"
import { LoadingSpinner, NoItemsPlaceholder } from "../../../../components"

import ChatLink from "./ChatRow"
import { readAllChats } from "../../redux"

export default function ChatsList({ openChatId }: Props) {
  const dispatch = useAppDispatch()

  const chats = useAppSelector((state) => state.chats.chats)
  useEffect(() => {
    if (chats === undefined) dispatch(readAllChats())
  }, [openChatId])

  const render = () => {
    if (chats === undefined) return <LoadingSpinner />
    else if (chats.length < 1) return <NoItemsPlaceholder />
    else
      return (
        <Stack>
          {[...chats]
            .sort((lhs, rhs) => lhs.id - rhs.id)
            .map((chat) => (
              <Fragment key={chat.id}>
                <ChatLink chat={chat} isOpen={openChatId !== undefined && chat.id === openChatId} />

                {[...chats].sort((lhs, rhs) => lhs.id - rhs.id).indexOf(chat) !== chats.length - 1 && <Divider />}
              </Fragment>
            ))}
        </Stack>
      )
  }
  return <Card elevation={3}>{render()}</Card>
}

interface Props {
  openChatId?: number
}