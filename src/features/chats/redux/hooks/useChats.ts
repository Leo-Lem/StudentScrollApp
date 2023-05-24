import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"

import Chat from "../../types/Chat"
import readAllChats from "../actions/readAllChats"

export default function useChats(): Chat[] | undefined {
  const chats = useAppSelector((state) => state.chats.chats)

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (chats === undefined) void dispatch(readAllChats())
  }, [])

  return chats
}
