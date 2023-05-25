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
    search: async (query: string) => {
      setQuery(query)

      if (!isNaN(parseInt(query)) && results === undefined)
        await dispatch(readProfile(parseInt(query)))

      await dispatch(readProfileByName(query))
      await dispatch(readProfileByInterest(query))
    }
  }
}
