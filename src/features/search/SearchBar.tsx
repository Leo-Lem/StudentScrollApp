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
      case "profileById":
        return t("SEARCH_PROFILES")
      default:
        return t("SEARCH_OTHER")
    }
  }

  const getOptionLabel = (option: string | SearchResult): string => {
    if (typeof option === "string") return option

    switch (option.id) {
      case "profileById":
        return option.value.name
      default:
        return ""
    }
  }

  const renderOption = (option: SearchResult): ReactNode => {
    switch (option.id) {
      case "profileById" || "profileByName" || "profileByInterest":
        return (
          <LinkMenuItem
            href={`/profile/${option.value.studentId}`}
            dismiss={() => {}}
            key={option.id + option.value.studentId.toString()}
          >
            {option.value.name}
          </LinkMenuItem>
        )
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
