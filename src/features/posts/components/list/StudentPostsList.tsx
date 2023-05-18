import { Stack } from "@mui/material"

import { LoadingSpinner } from "../../../../components"
import NoItemsPlaceholder from "../../../../components/NoItemsPlaceholder"
import { useAppDispatch, useAppSelector } from "../../../../redux"

import PostsList from "./PostsList"
import { useEffect } from "react"
import readStudentPosts from "../../redux/actions/readStudentPosts"

export default function StudentPostsList({ studentId }: Props) {
  const dispatch = useAppDispatch()

  const posts = useAppSelector((state) => state.posts.studentPosts[studentId])

  useEffect(() => {
    if (posts === undefined) dispatch(readStudentPosts(studentId))
  }, [studentId])

  if (posts === undefined) return <LoadingSpinner />
  else if (posts.length < 1) return <NoItemsPlaceholder message="NO_POSTS_PLACEHOLDER" />
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
