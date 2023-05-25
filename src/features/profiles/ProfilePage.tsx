import { Card, Grid, Stack } from "@mui/material"
import { Fragment } from "react"

import { LoadingSpinner } from "../../components"
import { useIdParam, useIsCompact } from "../../lib/hooks"

import StartChatButton from "../chats/components/StartChatButton"
import StudentPostsList from "../posts/components/lists/StudentPostsList"
import EditableProfileDetails from "./components/EditableProfileDetails"
import ProfileDetails from "./components/ProfileDetails"
import { useProfile } from "./redux"
import { useStudentId } from "../student"
import FollowsList from "./components/following/FollowsList"
import FollowersList from "./components/following/FollowersList"

export default function ProfilePage() {
  const isCompact = useIsCompact()

  const currentStudentId = useStudentId()
  const studentId = useIdParam("studentId") ?? currentStudentId
  const isSelf = studentId === currentStudentId

  const profile = useProfile(studentId)

  const details = (
    <Card elevation={3}>
      <Stack direction="column" spacing={1} alignItems={isCompact ? "center" : "end"}>
        {profile === undefined ? (
          <LoadingSpinner />
        ) : isSelf ? (
          <EditableProfileDetails profile={profile} />
        ) : (
          <ProfileDetails profile={profile} />
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
