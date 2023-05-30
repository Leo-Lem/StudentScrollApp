import { useTranslation } from "react-i18next"

import { useStudentId } from "../../../student"
import { useProfile } from "../../redux"
import ProfilesList from "../ProfilesList"

export default function FollowersList({ studentId }: Props) {
  const [t] = useTranslation()
  const currentStudentId = useStudentId()

  const followers = useProfile(studentId ?? currentStudentId)?.followers

  return (
    <ProfilesList
      studentIds={followers?.filter((follower, index) => followers.indexOf(follower) === index)}
      label={t("FOLLOWERS")}
      display="scroll"
    />
  )
}

interface Props {
  studentId?: number
}
