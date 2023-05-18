import { Server } from "miragejs"

export default function mockPosts(server: Server) {
  server.post("posts", (schema: any, { requestBody }) => {
    const post = schema.posts.create(JSON.parse(requestBody))
    return { ...post.attrs, id: parseInt(post.id) }
  })

  server.get("posts", (schema: any, { queryParams }) => {
    const {
      page: pageParam,
      size: sizeParam,
      sortAscending: sortAscendingParam,
      posterIds: posterIdsParam
    } = queryParams

    const page = pageParam !== undefined ? parseInt(pageParam) : undefined
    const size = sizeParam !== undefined ? parseInt(sizeParam) : undefined
    const sortAscending =
      sortAscendingParam !== undefined ? sortAscendingParam === "true" : undefined
    const posterIds =
      posterIdsParam !== undefined
        ? posterIdsParam.split(",").map((id: string) => parseInt(id))
        : undefined

    let posts

    if (posterIds !== undefined)
      posts = schema.posts.where((post: any) => posterIds.includes(parseInt(post.posterId))).models
    else if (page !== undefined && size !== undefined && sortAscending !== undefined)
      posts = schema.posts
        .all()
        .models.sort((lhs: any, rhs: any) => (sortAscending ? lhs.id - rhs.id : rhs.id - lhs.id))
        .slice(page * size, (page + 1) * size)
    else posts = schema.posts.all().models

    return posts.map((model: any) => ({
      ...model.attrs,
      id: parseInt(model.id),
      posterId: parseInt(model.posterId)
    }))
  })

  server.delete("posts/:id", (schema: any, { params }) => {
    return schema.posts.find(params.id).destroy()
  })
}
