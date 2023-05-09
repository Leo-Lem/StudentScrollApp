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
import { readPosts, toggleNewestFirst } from ".."

export default function PostsScroll(): ReactElement {
  const posts = useAppSelector((state) => state.posts.posts)
  const newestFirst = useAppSelector((state) => state.posts.newestFirst)

  const dispatch = useAppDispatch()

  useEffect(() => {
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

      {posts === undefined ? (
        <CircularProgress />
      ) : (
        posts.map((post) => (
          <Slide direction="down" key={post.id} in mountOnEnter unmountOnExit>
            <Box width="100%">
              <ContentPostCard post={post} />
            </Box>
          </Slide>
        ))
      )}
    </Stack>
  )
}
