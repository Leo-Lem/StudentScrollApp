import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"

import SearchResult from "../../types/SearchResult"
import { addToHistory } from "../slice"

export default function useSearchHistory(): {
  history: SearchResult[]
  add: (result: SearchResult) => void
} {
  const history = useAppSelector(({ search }) => search.__history__)

  const dispatch = useAppDispatch()
  const add = (result: SearchResult) => {
    void dispatch(addToHistory(result))
  }

  return { history, add }
}
