import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"

import ContentPost from "../../types/ContentPost"
import readPostsByPosterId from "../actions/readPostsByPosterId"

export default function useStudentPosts(studentId: number): ContentPost[] {
  const dispatch = useAppDispatch()

  const posts = useAppSelector((state) => state.posts.posts.filter((p) => p.posterId === studentId))

  useEffect(() => {
    if (posts.length === 0) void dispatch(readPostsByPosterId(studentId))
  }, [studentId])

  return posts
}
