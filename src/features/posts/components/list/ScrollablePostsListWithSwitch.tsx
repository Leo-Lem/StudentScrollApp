import { Stack } from "@mui/material"
import { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "../../../../redux"

import LoadingSpinner from "../../../../components/LoadingSpinner"
import { readPosts } from "../../redux"
import NewestFirstSwitch from "../NewestFirstSwitch"

import PostsList from "./PostsList"

export default function ScrollablePostsListWithSwitch() {
  const posts = useAppSelector((state) => state.posts.posts)
  const newestFirst = useAppSelector((state) => state.posts.newestFirst)
  const nextPage = useAppSelector((state) => state.posts.nextPage)

  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch(readPosts())
  }, [newestFirst])

  useEffect(() => {
    const handleScroll = () => {
      if (
        nextPage !== undefined &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2
      ) {
        setIsLoading(true)
        dispatch(readPosts()).then(() => {
          setIsLoading(false)
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Stack spacing={1} alignItems="center">
      <NewestFirstSwitch />

      {posts === undefined ? <LoadingSpinner /> : <PostsList posts={posts} />}

      {isLoading && <LoadingSpinner />}
    </Stack>
  )
}
