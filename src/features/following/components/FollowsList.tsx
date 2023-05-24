import { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "../../../lib/hooks"

import ProfilesList from "../../profiles/components/ProfilesList"
import { readFollows } from "../redux"

export default function FollowsList({ studentId }: Props) {
  const dispatch = useAppDispatch()
  const [t] = useTranslation()

  const followIds = useAppSelector((state) =>
    studentId !== undefined ? state.following[studentId]?.follows : state.student.profile?.follows
  )

  useEffect(() => {
    if (followIds === undefined) void dispatch(readFollows(studentId))
  }, [studentId])

  return <ProfilesList studentIds={followIds} label={t("FOLLOWS")} display="scroll" />
}

interface Props {
  studentId?: number
}
