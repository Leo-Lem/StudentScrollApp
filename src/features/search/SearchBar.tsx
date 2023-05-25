import { Autocomplete, TextField } from "@mui/material"
import { useTranslation } from "react-i18next"

import SearchResultOption from "./components/SearchResultOption"
import { useSearchHistory } from "./redux"
import useSearch from "./redux/hooks/useSearch"
import SearchResult from "./types/SearchResult"

export default function SearchBar() {
  const [t] = useTranslation()

  const { query, results, search } = useSearch()
  const { history, add: addToHistory } = useSearchHistory()

  function dismiss(result: SearchResult) {
    addToHistory(result)
    search()
  }

  function group(result: SearchResult) {
    if (results === undefined && query === undefined) return t("SEARCH_HISTORY")
    else
      switch (result.id) {
        case "profile":
          return t("SEARCH_PROFILES")
        case "post":
          return t("SEARCH_POSTS")
      }
  }

  function label(option: string | SearchResult): string {
    if (typeof option === "string") return option
    else
      switch (option.id) {
        case "profile":
          return option.value.name
        case "post":
          return option.value.title
      }
  }

  return (
    <Autocomplete
      freeSolo
      clearOnEscape
      fullWidth
      inputValue={query ?? ""}
      options={results ?? (query === undefined ? history : [])}
      groupBy={group}
      getOptionLabel={label}
      renderInput={(props) => (
        <TextField {...props} variant="standard" placeholder={t("LABEL_SEARCH") ?? ""} />
      )}
      renderOption={(_, option) => <SearchResultOption result={option} onDismiss={dismiss} />}
      onInputChange={(_, value) => search(value)}
      filterOptions={(x) => x} // necessary to show async search results
    />
  )
}
