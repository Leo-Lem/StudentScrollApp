import { Box, Slide, Stack } from "@mui/material"
import { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "../../../redux"

import LoadingSpinner from "../../../components/LoadingSpinner"
import { readPosts } from "../redux"
import NewestFirstSwitch from "./NewestFirstSwitch"
import ContentPostCard from "./PostCard"

export default function PostsList() {
  const posts = useAppSelector((state) => state.posts.posts)
  const newestFirst = useAppSelector((state) => state.posts.newestFirst)
  const nextPage = useAppSelector((state) => state.posts.nextPage)

  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    void dispatch(readPosts())
  }, [newestFirst])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 &&
        nextPage !== undefined
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

      {posts?.map((post) => (
        <Slide in direction="down" mountOnEnter key={post.id}>
          <Box width="100%">
            <ContentPostCard post={post} />
          </Box>
        </Slide>
      )) ?? <LoadingSpinner />}

      {isLoading && <LoadingSpinner />}
    </Stack>
  )
}
