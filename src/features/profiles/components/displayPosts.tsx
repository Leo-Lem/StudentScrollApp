import React, { ReactElement, useEffect, useState } from "react"
import { Typography, CircularProgress } from "@mui/material"
import PostCard from "../../posts/components/PostCard"
import { ContentPost } from "../../posts"

export function DisplayPost({ id }: Props): ReactElement {
  const [userPosts, setUserPosts] = useState<ContentPost[] | undefined>(undefined)

  useEffect(() => {
    // Fetch the user's posts based on the ID
    fetchUserPosts()
  }, [])

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`api/v1/posts?posterIds=${id}`)
      const data = (await response.json()) as ContentPost[]
      setUserPosts(data)
    } catch (error) {
      console.error("Error fetching user posts:", error)
    }
  }

  if (userPosts === undefined) return <CircularProgress />
  else
    return (
      <div>
        <Typography variant="h3">User Profile</Typography>
        <Typography variant="h5">User ID: {id}</Typography>

        <Typography variant="h4">Posts</Typography>
        {userPosts.length === 0 ? (
          <Typography variant="body1">No posts to display.</Typography>
        ) : (
          userPosts.map((post) => <PostCard post={post} key={post.id} />)
        )}
      </div>
    )
}

interface Props {
  id: number
}

export default DisplayPost
