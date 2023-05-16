import { ReactElement, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "../../../redux"
import { LoadingSpinner } from "../../../components"

import ProfilesList from "../../profiles/components/ProfilesList"
import { readFollowers } from "../redux"

export default function FollowersList({ studentId }: Props): ReactElement {
  const dispatch = useAppDispatch()
  const [t] = useTranslation()

  const followerIds = useAppSelector((state) => (
    studentId !== undefined ? state.following[studentId]?.followers : state.student?.followers
  ))

  useEffect(() => {
    if (studentId !== undefined && followerIds === undefined)
      void dispatch(readFollowers(studentId))
  }, [studentId,])

  return <ProfilesList studentIds={followerIds} label={t("FOLLOWERS")} />
}

interface Props {
  studentId?: number
}
