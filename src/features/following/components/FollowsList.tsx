import { ReactElement, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "../../../redux"

import ProfilesList from "../../profiles/components/ProfilesList"
import { readFollows } from "../redux"

export default function FollowsList({ studentId }: Props): ReactElement {
  const dispatch = useAppDispatch()
  const [t] = useTranslation()

  const followIds = useAppSelector((state) =>
    studentId !== undefined ? state.following[studentId]?.follows : state.student?.follows
  )

  useEffect(() => {
    if (followIds === undefined) void dispatch(readFollows(studentId))
  }, [studentId])

  return <ProfilesList studentIds={followIds} label={t("FOLLOWS")} />
}

interface Props {
  studentId?: number
}
