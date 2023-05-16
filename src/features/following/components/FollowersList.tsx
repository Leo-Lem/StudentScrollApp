import { ReactElement, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "../../../redux"
import { LoadingSpinner } from "../../../components"

import ProfilesList from "../../profiles/components/ProfilesList"
import { readFollowers } from "../redux"

export default function FollowersList({ studentId }: Props): ReactElement {
  const dispatch = useAppDispatch()
  const [t] = useTranslation()

  const id = useAppSelector((state) => studentId ?? state.authentication.studentId)

  if (id === undefined) throw new Error("Not authenticated")

  const followerIds = useAppSelector((state) => state.following[id]?.followers)

  useEffect(() => {
    if (followerIds === undefined) void dispatch(readFollowers(id))
  }, [studentId,])

  if (followerIds === undefined) return <LoadingSpinner />
  else return <ProfilesList studentIds={followerIds} label={t("FOLLOWERS")} />
}

interface Props {
  studentId?: number
}
