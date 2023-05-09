import { Server } from "miragejs"

export const examplePosts = [
  { id: "1", title: "First Post", tags: ["First", "A new beginning!"], content: "This is the first post", posterId: 1 },
  { id: "2", title: "Second Post", tags: ["Second"], content: "This is the second post", posterId: 1 },
  { id: "3", title: "Third Post", tags: [], content: "This is the third post", posterId: 1 },
]

export default function mockPosts(server: Server) {
  server.post("posts", (schema: any, { requestBody }) => {
    const post = schema.posts.create(JSON.parse(requestBody))
    return { ...post.attrs, id: parseInt(post.id) }
  })

  server.get("posts", (schema: any, { queryParams }) => {
    return JSON.stringify(
      (schema.posts.all().models as any[])
        .map((model) => ({ ...model.attrs, id: parseInt(model.id) }))
        .sort((lhs: any, rhs: any) =>
          (JSON.parse(queryParams.sortAscending) as boolean)
            ? lhs.id - rhs.id
            : rhs.id - lhs.id
        )
    )
  })

  server.delete("posts/:id", (schema: any, { params }) => {
    return schema.posts.find(params.id).destroy()
  })
}