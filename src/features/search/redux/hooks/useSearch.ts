import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"
import SearchResult from "../../types/SearchResult"
import readProfile from "../../../profiles/redux/actions/readProfile"
import readProfileByName from "../actions/readProfileByName"
import readProfileByInterest from "../actions/readProfileByInterest"
import readPostByTitle from "../actions/readPostByTitle"
import readPostByTags from "../actions/readPostByTags"

export default function useSearch(): {
  query: string | undefined
  results: SearchResult[] | undefined
  search: (query?: string) => void
} {
  const [query, setQuery] = useState<string | undefined>(undefined)

  const results = useAppSelector(({ search }) => {
    if (query !== undefined) return search[query]
  })

  const dispatch = useAppDispatch()
  const search = (q?: string) => {
    const trimmed = q?.trim()
    if (trimmed === undefined || trimmed === "") return setQuery(undefined)
    else setQuery(trimmed)
  }

  useEffect(() => {
    if (query === undefined || results !== undefined) return

    if (!isNaN(parseInt(query)) && results === undefined) dispatch(readProfile(parseInt(query)))

    dispatch(readProfileByName(query))
    dispatch(readProfileByInterest(query))

    dispatch(readPostByTitle(query))
    dispatch(readPostByTags(query))
  }, [query])

  return { query, results, search }
}
