import { Grid, Typography } from "@mui/material"
import { type ReactElement, useEffect, Fragment } from "react"

import { ProfileIcon } from "../../../components"
import { useAppDispatch, useAppSelector } from "../../../redux"

import { readProfile } from "../profileReducer"
import useIsCompact from "../../../hooks/useIsCompact"
import LoadingSpinner from "../../../components/LoadingSpinner"

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
        <ProfileIcon
          fontSize="large"
          sx={{ fontSize: isCompact ? "max(30vw, 30vh)" : "max(15vw, 15vh)", aspectRatio: 1 }}
          iconId={profile.icon}
        />

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
