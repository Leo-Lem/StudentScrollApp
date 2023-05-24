import { useEffect } from "react"

import { AsyncToggle, Label } from "../../../components"
import { useAppDispatch, useAppSelector } from "../../../lib/hooks"

import { follow, readFollows, unfollow } from "../redux"
import { useStudentId } from "../../student"

export default function FollowButton({ followId }: Props) {
  const dispatch = useAppDispatch()

  const studentId = useStudentId()

  if (studentId === undefined) throw new Error("Not authenticated")

  const isFollowing = useAppSelector(
    (state) => state.following[studentId]?.follows?.includes(followId) ?? false
  )

  const handleFollow = async (): Promise<boolean> => {
    await dispatch(follow(followId))
    return true
  }

  const handleUnfollow = async (): Promise<boolean> => {
    await dispatch(unfollow(followId))
    return true
  }

  useEffect(() => {
    void dispatch(readFollows(studentId))
  }, [])

  return (
    <AsyncToggle selected={isFollowing} action={isFollowing ? handleUnfollow : handleFollow}>
      <Label type={isFollowing ? "unfollow" : "follow"} display="iconOnly" />
    </AsyncToggle>
  )
}

interface Props {
  followId: number
}
