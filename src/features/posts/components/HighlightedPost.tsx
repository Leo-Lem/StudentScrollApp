import { LoadingSpinner } from "../../../components"
import { usePost } from "../redux"
import PostCard from "./PostCard"

export default function HighlightedPost({ postId }: Props) {
  const { post } = usePost(postId)

  if (post === undefined) return <LoadingSpinner />
  else return <PostCard post={post} sx={{ margin: 3, padding: 1, boxShadow: "0 0 5px 5px" }} />
}

interface Props {
  postId: number
}
