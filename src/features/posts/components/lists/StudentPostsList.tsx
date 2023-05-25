import { Stack } from "@mui/material"

import { LoadingSpinner, Placeholder } from "../../../../components"

import { useStudentPosts } from "../../redux"
import PostsList from "./PostsList"

export default function StudentPostsList({ studentId }: Props) {
  const posts = useStudentPosts(studentId)

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
