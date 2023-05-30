import { useTranslation } from "react-i18next"

import ProfilesList from "../ProfilesList"
import { useProfile } from "../../redux"
import { useStudentId } from "../../../student"

export default function FollowsList({ studentId }: Props) {
  const [t] = useTranslation()
  const currentStudentId = useStudentId()

  const follows = useProfile(studentId ?? currentStudentId)?.follows

  return (
    <ProfilesList
      studentIds={follows?.filter((follow, index) => follows.indexOf(follow) === index)}
      label={t("FOLLOWS")}
      display="scroll"
    />
  )
}

interface Props {
  studentId?: number
}
