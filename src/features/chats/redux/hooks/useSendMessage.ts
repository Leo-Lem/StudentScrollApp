import { useAppDispatch } from "../../../../lib/hooks"

import sendMessage from "../actions/sendMessage"

export default function useSendMessage(): (chatId: number, content: string) => Promise<void> {
  const dispatch = useAppDispatch()
  return async (chatId: number, content: string) =>
    void (await dispatch(sendMessage({ chatId, content })))
}
