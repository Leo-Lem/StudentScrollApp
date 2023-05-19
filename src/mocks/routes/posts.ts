import { Server } from "miragejs"

export default function mock(server: Server) {
  server.post("posts", (schema: any, { requestBody }) =>
    respond(schema.posts.create(JSON.parse(requestBody)))
  )

  server.get(
    "posts",
    (schema: any, { queryParams: { posterIds: po, page: pa, size: si, sortAscending: so } }) => {
      const posterIds = po !== undefined ? po.split(",") : undefined

      const page = pa !== undefined ? parseInt(pa) : undefined
      const size = si !== undefined ? parseInt(si) : undefined
      const sortAscending = so !== undefined ? so === "true" : undefined

      let posts

      if (posterIds !== undefined)
        posts = schema.posts.where((post: any) => posterIds.includes(post.posterId)).models
      else if (page !== undefined && size !== undefined && sortAscending !== undefined)
        posts = schema.posts
          .all()
          .models.sort((lhs: any, rhs: any) => (sortAscending ? lhs.id - rhs.id : rhs.id - lhs.id))
          .slice(page * size, (page + 1) * size)
      else posts = schema.posts.all().models

      return posts.map(respond)
    }
  )

  server.delete("posts/:postId", (schema: any, { params: { postId } }) => {
    return schema.posts.find(postId).destroy()
  })
}

interface Response {
  id: number
  title: string
  tags: string[]
  content: string
  posterId: number
}

function respond(post: any): Response {
  return {
    id: parseInt(post.id),
    title: post.title,
    tags: post.tags,
    content: post.content,
    posterId: parseInt(post.posterId)
  }
}
