import { type ReactElement, useEffect, useState } from "react"
import { Box, Slide, Stack } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../redux"

import { readPosts, resetPosts } from "../postsReducer"
import ContentPostCard from "./PostCard"
import NewestFirstSwitch from "./NewestFirstSwitch"
import LoadingSpinner from "../../../components/LoadingSpinner"

// TODO: figure out how to not send a billion requests for each scroll

export default function PostsScroll(): ReactElement {
  const posts = useAppSelector((state) => state.posts.posts)
  const newestFirst = useAppSelector((state) => state.posts.newestFirst)
  const nextPage = useAppSelector((state) => state.posts.nextPage)

  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch(resetPosts())
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
