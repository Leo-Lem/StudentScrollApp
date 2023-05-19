import { Stack } from "@mui/material"
import { useEffect } from "react"

import { LoadingSpinner, Placeholder } from "../../../../components"
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"

import readStudentPosts from "../../redux/actions/readStudentPosts"
import PostsList from "./PostsList"

export default function StudentPostsList({ studentId }: Props) {
  const dispatch = useAppDispatch()

  const posts = useAppSelector((state) => state.posts.studentPosts[studentId])

  useEffect(() => {
    if (posts === undefined) dispatch(readStudentPosts(studentId))
  }, [studentId])

  if (posts === undefined) return <LoadingSpinner />
  else if (posts.length < 1) return <Placeholder message="NO_POSTS_PLACEHOLDER" />
  else
    return (
      <Stack spacing={1} alignItems="center" direction="column-reverse">
        <PostsList posts={posts} />
      </Stack>
    )
}

interface Props {
  studentId: number
}
