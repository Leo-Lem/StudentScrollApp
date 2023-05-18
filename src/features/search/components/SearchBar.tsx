import { Autocomplete, TextField } from "@mui/material"
import { ReactNode, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "../../../redux"

import LinkMenuItem from "../../../components/buttons/LinkMenuItem"
import { readProfile } from "../../profiles/redux"

export default function SearchBar() {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const [searchQuery, setSearchQuery] = useState("")
  const [profileByIdQuery, setProfileByIdQuery] = useState<number | undefined>(undefined)

  useEffect(() => {
    setProfileByIdQuery(isNaN(parseInt(searchQuery)) ? undefined : parseInt(searchQuery))
  }, [searchQuery])

  useEffect(() => {
    if (profileByIdQuery !== undefined) dispatch(readProfile(profileByIdQuery))
  }, [profileByIdQuery])

  const profileById = useAppSelector(({ profiles }) =>
    profileByIdQuery === undefined ? undefined : profiles[profileByIdQuery]
  )

  const options = (): SearchResult[] => {
    return profileById !== undefined ? [{ id: "profileById", value: profileById }] : []
  }

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
      case "profileById":
        return (
          <LinkMenuItem
            href={`/profile/${profileByIdQuery}`}
            dismiss={() => setSearchQuery("")}
            key={profileByIdQuery}
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
      inputValue={searchQuery}
      options={options()}
      groupBy={groupBy}
      getOptionLabel={getOptionLabel}
      renderInput={(props) => (
        <TextField {...props} variant="standard" placeholder={t("LABEL_SEARCH") ?? ""} />
      )}
      renderOption={(props, option) => renderOption(option)}
      onInputChange={(_, value) => {
        setSearchQuery(value)
      }}
      filterOptions={(x) => x} // necessary to show async search results
    />
  )
}

interface SearchResult {
  id: string
  value: any
}
