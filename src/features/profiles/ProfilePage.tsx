import { useEffect, Fragment } from "react"
import { Navigate, useParams } from "react-router-dom"
import { Card, Grid, Stack } from "@mui/material"

import useIsCompact from "../../lib/useIsCompact"
import { LoadingSpinner } from "../../components"
import { useAppDispatch, useAppSelector } from "../../redux"
import { FollowersList, FollowsList } from "../following"
import StartChatButton from "../chats/components/StartChatButton"

import EditableProfileDetails from "./components/EditableProfileDetails"
import { useAppDispatch, useAppSelector } from "../../redux"
import { FollowersList, FollowsList } from "../following"
import ProfileDetails from "./components/ProfileDetails"
import { readProfile } from "./redux"
import { LoadingSpinner } from "../../components"
import StartChatButton from "../chats/components/StartChatButton"

export default function ProfilePage(): ReactElement {
  const isCompact = useIsCompact()

  const dispatch = useAppDispatch()

  const currentStudentId = useAppSelector((state) => state.authentication.studentId)

  const { studentId } = useParams()
  if (currentStudentId === undefined || studentId === undefined || isNaN(parseInt(studentId)))
    return <Navigate to="/" />

  const id = parseInt(studentId)
  const profile = useAppSelector((state) => state.profiles[id])
  const isSelf = id === currentStudentId

  useEffect(() => {
    if (profile === undefined) void dispatch(readProfile(id))
  }, [id])

  const details = (
    <Card elevation={3}>
      <Stack direction="column" spacing={1} alignItems={isCompact ? "center" : "end"}>
        {profile === undefined ? (
          <LoadingSpinner />
        ) : isSelf ? (
          <EditableProfileDetails profile={profile} />
        ) : (
          <ProfileDetails followId={id} profile={profile} />
        )}
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

  const startChat = <Fragment>{!isSelf && <StartChatButton studentId={id} />}</Fragment>

  const compact = (
    <Stack direction="column" spacing={1}>
      {details}
      {startChat}
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
          <Grid item md={12}>
            {details}
          </Grid>

          <Grid item md>
            {startChat}
          </Grid>

          <Grid item md={12}>
            {followsList}
          </Grid>

          <Grid item md={12}>
            {followersList}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )

  return isCompact ? compact : regular
}
