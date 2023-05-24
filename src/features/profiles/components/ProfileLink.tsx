import { Button, Link } from "@mui/material"

import { useStudentId } from "../../student"
import { useProfile } from "../redux"
import ProfileBadge from "./ProfileBadge"

export default function ProfileLink({ studentId, disabled }: Props) {
  const currentStudentId = useStudentId()
  const profile = useProfile(studentId)

  return (
    <Button
      color="inherit"
      component={Link}
      disabled={disabled ?? false}
      href={`/profile/${studentId}`}
      sx={{ padding: 0, borderRadius: 100 }}
    >
      <ProfileBadge profile={profile} isSelf={currentStudentId === studentId} />
    </Button>
  )
}

interface Props {
  studentId: number
  disabled?: boolean
}
