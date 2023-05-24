import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../lib/hooks"

import follow from "../actions/follow"
import unfollow from "../actions/unfollow"
import loadStudent from "../actions/loadStudent"

export default function useFollow(
  followId: number
): { isFollowing: boolean; toggle: () => Promise<void> } | undefined {
  const isFollowing = useAppSelector((state) => state.student.profile?.follows?.includes(followId))
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isFollowing === undefined) dispatch(loadStudent())
  })

  if (isFollowing === undefined) return undefined
  else
    return {
      isFollowing,
      toggle: async () => {
        if (isFollowing) await dispatch(follow(followId))
        else await dispatch(unfollow(followId))
      }
    }
}
