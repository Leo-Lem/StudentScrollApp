import { Autocomplete, TextField } from "@mui/material"
import { ReactNode, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "../../lib/hooks"

import LinkMenuItem from "../../components/buttons/LinkMenuItem"
import readProfile from "../profiles/redux/actions/readProfile"

export default function SearchBar(): ReactElement {
  const [t] = useTranslation()

  const [searchId, setSearchId] = useState<number | undefined>(undefined)
  const [profileByNameQuery, setProfileByNameQuery] = useState<string | undefined>(undefined)
  const dispatch = useAppDispatch()

  const [searchQuery, setSearchQuery] = useState("")
  const [profileByIdQuery, setProfileByIdQuery] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (+searchQuery ? true : false) {
      setProfileByIdQuery(isNaN(parseInt(searchQuery)) ? undefined : parseInt(searchQuery))
    } else if (searchQuery) {
      setProfileByNameQuery(searchQuery ? searchQuery : undefined)
    }
  }, [searchQuery])

  useEffect(() => {
    if (profileByIdQuery !== undefined) dispatch(readProfile(profileByIdQuery))
  }, [profileByIdQuery])

  const profileById = useAppSelector(({ profiles }) => {
    if (profileByIdQuery === undefined && searchId !== undefined) {
      return profiles[searchId]
    } else if (profileByIdQuery !== undefined && searchId === undefined) {
      return profiles[profileByIdQuery]
    } else {
      return undefined
    }
  })

  useEffect(() => {
    profileByNameQuery !== undefined &&
      dispatch(readProfile(profileByNameQuery)).then((result) => setSearchId(result.payload))
  }, [profileByNameQuery])

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
          <LinkMenuItem href={`/profile/${option.value.studentsId}`} dismiss={clear} key={searchId}>
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
