import { Autocomplete, TextField } from "@mui/material"
import { useState, type ReactElement, useEffect, ReactNode } from "react"
import { useAppDispatch, useAppSelector } from "../../../../redux"

import { readProfile } from "../.."
import LinkMenuItem from "../../../../components/LinkMenuItem"

export default function SearchBar(): ReactElement {
  const dispatch = useAppDispatch()

  const [searchQuery, setSearchQuery] = useState("")
  useEffect(() => {
    setProfileByIdQuery(isNaN(parseInt(searchQuery)) ? undefined : parseInt(searchQuery))
  }, [searchQuery])

  const [profileByIdQuery, setProfileByIdQuery] = useState<number | undefined>(undefined)
  useEffect(() => {
    profileByIdQuery !== undefined && dispatch(readProfile(profileByIdQuery))
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
        return "Profiles"
      default:
        return "Other"
    }
  }

  const renderOption = (option: SearchResult): ReactNode => {
    switch (option.id) {
      case "profileById":
        return (
          <LinkMenuItem href={`/profile/${profileByIdQuery}`} dismiss={clear}>
            {option.value.name}
          </LinkMenuItem>
        )
    }
  }

  const clear = () => {
    setSearchQuery("")
  }

  return (
    <Autocomplete
      freeSolo
      clearOnEscape
      fullWidth
      inputValue={searchQuery}
      options={options()}
      groupBy={groupBy}
      renderInput={(props) => <TextField {...props} variant="standard" placeholder="Search" />}
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
