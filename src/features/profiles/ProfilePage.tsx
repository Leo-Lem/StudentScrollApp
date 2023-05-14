import { type ReactElement } from "react"
import { Navigate, useParams } from "react-router-dom"
import { Grid, Stack, Card } from "@mui/material"

import useIsCompact from "../../hooks/useIsCompact"

import ProfileDetails from "./components/ProfileDetails"
import { useAppSelector } from "../../redux"
import { FollowersList, FollowsList } from "../following"

export default function ProfilePage(): ReactElement {
  const isCompact = useIsCompact()
  const currentStudentId = useAppSelector((state) => state.authentication.studentId)

  const { studentId } = useParams()
  if (studentId === undefined || isNaN(parseInt(studentId))) return <Navigate to="/" />

  const id = parseInt(studentId)

  const details = (
    <Card elevation={3}>
      <Stack direction="column" spacing={1} alignItems={isCompact ? "center" : "end"}>
        <ProfileDetails
          studentId={id}
          isSelf={currentStudentId !== undefined && id === currentStudentId}
        />
      </Stack>
    </Card>
  )

  const followsList = (
    <Card elevation={2}>
      <FollowsList studentId={id} />
    </Card>
  )

  const followersList = (
    <Card elevation={2}>
      <FollowersList studentId={id} />
    </Card>
  )

  const posts = (
    <Card elevation={2}>
      <h1>Posts</h1>
    </Card>
  )

  const compact = (
    <Stack direction="column" spacing={1}>
      {details}
      {followsList}
      {followersList}
      {posts}
    </Stack>
  )

  const regular = (
    <Grid container direction="row" spacing={1}>
      <Grid item md={8}>
        {posts}
      </Grid>

      <Grid item md={4}>
        <Grid container spacing={1}>
          <Grid item md>
            {details}
          </Grid>

          <Grid item md>
            {followsList}
          </Grid>

          <Grid item md>
            {followersList}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )

  return isCompact ? compact : regular
}
