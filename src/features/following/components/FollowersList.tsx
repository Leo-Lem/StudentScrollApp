import { ReactElement, useEffect } from "react"
import { Chip, Grid } from "@mui/material"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "../../../redux"
import { LoadingSpinner } from "../../../components"
import { ProfileLink } from "../../profiles"

import { readFollowers } from "../followingReducer"

export default function FollowersList({ studentId }: Props): ReactElement {
  const dispatch = useAppDispatch()
  const [t] = useTranslation()

  const id = useAppSelector((state) => studentId ?? state.authentication.studentId)

  if (id === undefined) throw new Error("Not authenticated")

  const followerIds = useAppSelector((state) => state.following[id]?.followers)

  useEffect(() => {
    if (followerIds === undefined) void dispatch(readFollowers(id))
  }, [studentId])

  if (followerIds === undefined) return <LoadingSpinner />
  else
    return (
      <Grid container direction="column" gap={1}>
        <Grid container justifyContent="space-between">
          <Chip label={t("FOLLOWERS")} />

          <Chip label={followerIds.length} />
        </Grid>

        <Grid container direction="row" gap={1} wrap="nowrap" overflow="scroll">
          {followerIds.map((followerId) => (
            <Grid item xs={2} key={followerId}>
              <ProfileLink studentId={followerId} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    )
}

interface Props {
  studentId?: number
}
