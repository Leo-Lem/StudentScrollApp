import { ReactElement, useEffect } from "react"
import { Chip, Grid } from "@mui/material"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "../../../redux"
import { LoadingSpinner, SecondaryCard } from "../../../components"
import { ProfileLink } from "../../profiles"

import { readFollows } from "../followingReducer"

export default function FollowsList({ studentId }: Props): ReactElement {
  const dispatch = useAppDispatch()
  const [t] = useTranslation()

  const id = useAppSelector((state) => studentId ?? state.authentication.studentId)

  if (id === undefined) throw new Error("Not authenticated")

  const followIds = useAppSelector((state) => state.following[id]?.follows)

  useEffect(() => {
    if (followIds === undefined)
      void dispatch(readFollows(id))
  }, [studentId])

  if (followIds === undefined)
    return <LoadingSpinner />
  else
    return (
      <SecondaryCard>
        <Grid container direction="column" gap={1}>
          <Grid container justifyContent="space-between">
            <Chip label={t("FOLLOWS")} />

            <Chip label={followIds.length} />
          </Grid>

          <Grid container direction="row" gap={1} wrap="nowrap" overflow="scroll">
            {followIds.map((followId) => (
              <Grid xs={4} md={2} key={followId} >
                <ProfileLink studentId={followId} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </SecondaryCard>
    )
}

interface Props {
  studentId?: number
}