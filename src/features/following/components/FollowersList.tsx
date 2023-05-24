import { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "../../../lib/hooks"

import ProfilesList from "../../profiles/components/ProfilesList"
import { readFollowers } from "../redux"

export default function FollowersList({ studentId }: Props) {
  const dispatch = useAppDispatch()
  const [t] = useTranslation()

  const followerIds = useAppSelector((state) =>
    studentId !== undefined
      ? state.following[studentId]?.followers
      : state.student.profile?.followers
  )

  useEffect(() => {
    if (followerIds === undefined) void dispatch(readFollowers(studentId))
  }, [studentId])

  return <ProfilesList studentIds={followerIds} label={t("FOLLOWERS")} display="scroll" />
}

interface Props {
  studentId?: number
}
