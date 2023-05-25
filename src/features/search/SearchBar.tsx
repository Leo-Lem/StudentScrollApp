import { Autocomplete, TextField } from "@mui/material"
import { ReactNode } from "react"
import { useTranslation } from "react-i18next"

import LinkMenuItem from "../../components/buttons/LinkMenuItem"
import useSearch from "./redux/hooks/useSearch"
import SearchResult from "./types/SearchResult"

export default function SearchBar() {
  const [t] = useTranslation()

  const { results, search } = useSearch()

  const groupBy = (option: SearchResult) => {
    switch (option.id) {
      case "profile":
        return t("SEARCH_PROFILES")
      case "post":
        return t("SEARCH_POSTS")
    }
  }

  const getOptionLabel = (option: string | SearchResult): string => {
    if (typeof option === "string") return option

    switch (option.id) {
      case "profile":
        return option.value.name
      case "post":
        return option.value.title
    }
  }

  const renderOption = (option: SearchResult): ReactNode => {
    switch (option.id) {
      case "profile":
        return (
          <LinkMenuItem
            href={`/profile/${option.value.studentId}`}
            dismiss={() => {}}
            key={option.id + option.value.studentId.toString()}
          >
            {option.value.name}
          </LinkMenuItem>
        )
      case "post":
        return <></>
    }
  }

  return (
    <Autocomplete
      freeSolo
      clearOnEscape
      fullWidth
      options={results ?? []}
      groupBy={groupBy}
      getOptionLabel={getOptionLabel}
      renderInput={(props) => (
        <TextField {...props} variant="standard" placeholder={t("LABEL_SEARCH") ?? ""} />
      )}
      renderOption={(props, option) => renderOption(option)}
      onInputChange={(_, value) => search(value)}
      filterOptions={(x) => x} // necessary to show async search results
    />
  )
}
