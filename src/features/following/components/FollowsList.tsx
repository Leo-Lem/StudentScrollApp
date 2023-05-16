import { ReactElement, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "../../../redux"
import { LoadingSpinner } from "../../../components"

import ProfilesList from "../../profiles/components/ProfilesList"
import { readFollows } from "../redux"

export default function FollowsList({ studentId }: Props): ReactElement {
  const dispatch = useAppDispatch()
  const [t] = useTranslation()

  const id = useAppSelector((state) => studentId ?? state.authentication.studentId)

  if (id === undefined) throw new Error("Not authenticated")

  const followIds = useAppSelector((state) => state.following[id]?.follows)

  useEffect(() => {
    if (followIds === undefined) void dispatch(readFollows(id))
  }, [studentId,])

  if (followIds === undefined) return <LoadingSpinner />
  else return <ProfilesList studentIds={followIds} label={t("FOLLOWS")} />
}

interface Props {
  studentId?: number
}
