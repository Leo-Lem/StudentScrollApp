import { Card, Divider, Stack } from "@mui/material"
import { Fragment } from "react"

import { LoadingSpinner, Placeholder } from "../../../../components"

import { useChats } from "../../redux"
import ChatLink from "./ChatRow"

export default function ChatsList({ openChatId }: Props) {
  const chats = useChats()

  const render = () => {
    if (chats === undefined) return <LoadingSpinner />
    else if (chats.length < 1) return <Placeholder />
    else
      return (
        <Stack>
          {[...chats]
            .sort((lhs, rhs) => lhs.id - rhs.id)
            .map((chat) => (
              <Fragment key={chat.id}>
                <ChatLink chat={chat} isOpen={openChatId !== undefined && chat.id === openChatId} />

                {[...chats].sort((lhs, rhs) => lhs.id - rhs.id).indexOf(chat) !==
                  chats.length - 1 && <Divider />}
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
