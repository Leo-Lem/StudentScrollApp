import { useAppDispatch } from "../../../../lib/hooks"
import createChat from "../actions/createChat"

export default function useCreateChat(): (participantId: number) => Promise<number | undefined> {
  const dispatch = useAppDispatch()

  return async (participantId: number) => (await dispatch(createChat(participantId))).payload as number | undefined
}