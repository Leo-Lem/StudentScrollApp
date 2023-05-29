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
    if (query !== undefined) return search[query.trim()]
  })

  const dispatch = useAppDispatch()
  const search = (q?: string) => void setQuery(q)

  useEffect(() => {
    const trimmed = query?.trim()
    if (trimmed === undefined || results !== undefined || trimmed === "") return

    if (!isNaN(parseInt(trimmed)) && results === undefined) dispatch(readProfile(parseInt(trimmed)))

    dispatch(readProfileByName(trimmed))
    dispatch(readProfileByInterest(trimmed))

    dispatch(readPostByTitle(trimmed))
    dispatch(readPostByTags(trimmed))
  }, [query])

  return { query, results, search }
}
