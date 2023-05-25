import { Stack } from "@mui/material"
import { useEffect, useState } from "react"

import { LoadingSpinner } from "../../../../components"

import { useDashboardPosts } from "../../redux"
import NewestFirstSwitch from "../menus/NewestFirstSwitch"

import PostsList from "./PostsList"

export default function ScrollablePostsListWithSwitch() {
  const { posts, $newestFirst, fetchMore } = useDashboardPosts()

  const [isLoading, setIsLoading] = useState(false)

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      setIsLoading(true)
      fetchMore().then(() => void setIsLoading(false))
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => void window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Stack spacing={1} alignItems="center">
      <NewestFirstSwitch $newestFirst={$newestFirst} />

      {posts === undefined ? <LoadingSpinner /> : <PostsList posts={posts} />}

      {isLoading && <LoadingSpinner />}
    </Stack>
  )
}
