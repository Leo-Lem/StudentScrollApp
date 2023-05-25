import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"
import SearchResult from "../../types/SearchResult"
import readProfile from "../../../profiles/redux/actions/readProfile"
import readProfileByName from "../actions/readProfileByName"
import readProfileByInterest from "../actions/readProfileByInterest"

export default function useSearch(): {
  results: SearchResult[] | undefined
  search: (query: string) => Promise<void>
} {
  const [query, setQuery] = useState<string | undefined>(undefined)

  const results = useAppSelector(({ search }) => {
    if (query !== undefined) return search[query]
  })

  const dispatch = useAppDispatch()

  return {
    results,
    search: async (q: string) => {
      setQuery(q)

      if (!isNaN(parseInt(q)) && results === undefined)
        await dispatch(readProfile(parseInt(q)))

      await dispatch(readProfileByName(q))
      await dispatch(readProfileByInterest(q))
    }
  }
}
