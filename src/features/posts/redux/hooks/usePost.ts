import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"

import ContentPost from "../../types/ContentPost"
import readPost from "../actions/readPost"
import { useStudentId } from "../../../student"
import deletePost from "../actions/deletePost"

export default function usePost(postId: number): {
  post: ContentPost | undefined
  deletePost?: () => Promise<void>
} {
  const post = useAppSelector((state) => state.posts.posts.find((p) => p.id === postId))

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (post === undefined) dispatch(readPost(postId))
  })

  const studentId = useStudentId()
  const handleDelete =
    post !== undefined && studentId === post.posterId
      ? async () => void (await dispatch(deletePost(post.id)))
      : undefined

  return { post, deletePost: handleDelete }
}
