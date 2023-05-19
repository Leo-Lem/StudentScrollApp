import { Card, Grid, Stack } from "@mui/material"
import { Fragment, useEffect } from "react"

import { LoadingSpinner } from "../../components"
import {
  useAppDispatch,
  useAppSelector,
  useIdParam,
  useIsCompact,
  useStudentId
} from "../../lib/hooks"

import StartChatButton from "../chats/components/StartChatButton"
import { FollowersList, FollowsList } from "../following"
import StudentPostsList from "../posts/components/list/StudentPostsList"
import EditableProfileDetails from "./components/EditableProfileDetails"
import ProfileDetails from "./components/ProfileDetails"
import { readProfile } from "./redux"

export default function ProfilePage() {
  const isCompact = useIsCompact()
  const dispatch = useAppDispatch()

  const currentStudentId = useStudentId()
  const studentId = useIdParam("studentId") ?? currentStudentId
  const isSelf = studentId === currentStudentId

  const profile = useAppSelector((state) => state.profiles[studentId])

  useEffect(() => {
    if (profile === undefined) void dispatch(readProfile(studentId))
  }, [studentId])

  const details = (
    <Card elevation={3}>
      <Stack direction="column" spacing={1} alignItems={isCompact ? "center" : "end"}>
        {profile === undefined ? (
          <LoadingSpinner />
        ) : isSelf ? (
          <EditableProfileDetails profile={profile} />
        ) : (
          <ProfileDetails followId={studentId} profile={profile} />
        )}
      </Stack>
    </Card>
  )

  const followsList = (
    <Card elevation={2}>
      <FollowsList studentId={studentId} />
    </Card>
  )

  const followersList = (
    <Card elevation={2}>
      <FollowersList studentId={studentId} />
    </Card>
  )

  const posts = <StudentPostsList studentId={studentId} />

  const startChat = <Fragment>{!isSelf && <StartChatButton studentId={studentId} />}</Fragment>

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

      <Grid item md={4} position="sticky" top={100} alignSelf="start">
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
