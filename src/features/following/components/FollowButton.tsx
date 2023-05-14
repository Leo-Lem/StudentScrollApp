import { ReactElement, useEffect } from "react";
import { AsyncButton, Label } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../redux";

import { follow, readFollows, unfollow } from "../../following/followingReducer";

export default function FollowButton({ followId }: Props): ReactElement {
  const dispatch = useAppDispatch()

  const isFollowing = useAppSelector((state) => state.following.follows?.includes(followId) ?? false)

  const handleFollow = async (): Promise<boolean> => {
    await dispatch(follow(followId))
    return true
  }

  const handleUnfollow = async (): Promise<boolean> => {
    await dispatch(unfollow(followId))
    return true
  }

  useEffect(() => {
    void dispatch(readFollows())
  }, [])

  return (
    <AsyncButton action={isFollowing ? handleUnfollow : handleFollow} variant="outlined">
      <Label type={isFollowing ? "unfollow" : "follow"} display="iconOnly" />
    </AsyncButton>
  )
}

interface Props {
  followId: number
}