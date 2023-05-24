import { AsyncToggle, Label, LoadingSpinner } from "../../../../components"
import { useFollow } from "../../../student"

export default function FollowButton({ followId }: Props) {
  const follow = useFollow(followId)

  if (follow === undefined) return <LoadingSpinner />
  else
    return (
      <AsyncToggle
        selected={follow.isFollowing}
        action={async () => {
          follow.toggle()
          return true
        }}
      >
        <Label type={follow.isFollowing ? "unfollow" : "follow"} display="iconOnly" />
      </AsyncToggle>
    )
}

interface Props {
  followId: number
}
