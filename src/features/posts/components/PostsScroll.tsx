import { type ReactElement, useEffect } from "react"
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Slide,
  Stack,
  Switch,
  Typography
} from "@mui/material"

import ContentPostCard from "./ContentPostCard"
import { useAppDispatch, useAppSelector } from "../../../redux"
import { readPosts, resetPosts, toggleNewestFirst } from ".."

export default function PostsScroll(): ReactElement {
  const posts = useAppSelector((state) => state.posts.posts)
  const newestFirst = useAppSelector((state) => state.posts.newestFirst)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetPosts())
    void dispatch(readPosts(0))
  }, [newestFirst])

  return (
    <Stack spacing={1} alignItems="center">
      <FormControlLabel
        sx={{ justifyContent: "end", alignSelf: "end" }}
        checked={newestFirst}
        label={<Typography variant="button">Newest first</Typography>}
        control={
          <Switch
            onChange={() => {
              dispatch(toggleNewestFirst())
            }}
          />
        }
      />

      {posts?.map((post) => (
        <Slide in direction="down" mountOnEnter key={post.id}>
          <Box width="100%" >
            <ContentPostCard post={post} />
          </Box>
        </Slide>
      )) ?? <CircularProgress />}

    </Stack>
  )
}
