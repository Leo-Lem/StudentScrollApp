import { Grid, Typography } from "@mui/material"
import { type ReactElement, useEffect, Fragment, createElement } from "react"

import { LoadingSpinner } from "../../../components"
import { useAppDispatch, useAppSelector } from "../../../redux"

import { readProfile } from "../profileReducer"
import useIsCompact from "../../../hooks/useIsCompact"
import { Icon } from "../../../res/icons"

export default function ProfileDetails({ studentId }: Props): ReactElement {
  const profile = useAppSelector((state) => state.profiles[studentId])
  const dispatch = useAppDispatch()

  const isCompact = useIsCompact()

  useEffect(() => {
    dispatch(readProfile(studentId))
  }, [studentId])

  if (profile === undefined) return <LoadingSpinner />
  else
    return (
      <Fragment>
        {createElement(Icon[profile.icon], {
          fontSize: "large",
          sx: { fontSize: isCompact ? "max(30vw, 30vh)" : "max(15vw, 15vh)", aspectRatio: 1 }
        })}

        <Grid item xs>
          <Typography noWrap overflow="scroll" textOverflow="ellipsis" variant="h3">
            {profile.name}
          </Typography>
        </Grid>

        <Typography variant="body1" textAlign={isCompact ? "center" : "end"}>
          {profile.bio}
        </Typography>
      </Fragment>
    )
}

interface Props {
  studentId: number
}
