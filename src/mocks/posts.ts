import { Response, Server } from "miragejs"

export const examplePosts = [
  {
    id: "1",
    title: "First Post",
    tags: ["First", "A new beginning!", "Lots of tags", "tags", "tagggggsssssssss"],
    content: "This is the first post",
    posterId: "1"
  },
  {
    id: "2",
    title: "Second Post",
    tags: ["Second"],
    content: "This is the second post",
    posterId: "2"
  },
  { id: "3", title: "Third Post", tags: [], content: "This is the third post", posterId: "3" },
  {
    id: "4",
    title: "Fourth Post",
    tags: [],
    content:
      "This is the fourth post. It is a lot longer than the others. I didn't add any tags though. That's for the next post. Well, I think it's about long enough now.",
    posterId: "1"
  },
  {
    id: "5",
    title: "Fifth Post",
    tags: ["Fifth"],
    content: "This is the fifth post",
    posterId: "2"
  },
  { id: "6", title: "Sixth Post", tags: [], content: "This is the sixth post", posterId: "3" },
  { id: "7", title: "Seventh Post", tags: [], content: "This is the seventh post", posterId: "1" },
  { id: "8", title: "Eighth Post", tags: [], content: "This is the eighth post", posterId: "2" },
  { id: "9", title: "Ninth Post", tags: [], content: "This is the ninth post", posterId: "3" },
  { id: "10", title: "Tenth Post", tags: [], content: "This is the tenth post", posterId: "1" },
  {
    id: "11",
    title: "Eleventh Post",
    tags: [],
    content: "This is the eleventh post",
    posterId: "2"
  },
  { id: "12", title: "Twelfth Post", tags: [], content: "This is the twelfth post", posterId: "3" },
  {
    id: "13",
    title: "Thirteenth Post",
    tags: [],
    content: "This is the thirteenth post",
    posterId: "1"
  },
  {
    id: "14",
    title: "Fourteenth Post",
    tags: [],
    content: "This is the fourteenth post",
    posterId: "2"
  },
  {
    id: "15",
    title: "Fifteenth Post",
    tags: [],
    content: "This is the fifteenth post",
    posterId: "3"
  },
  {
    id: "16",
    title: "Sixteenth Post",
    tags: [],
    content: "This is the sixteenth post",
    posterId: "1"
  },
  {
    id: "17",
    title: "Seventeenth Post",
    tags: [],
    content: "This is the seventeenth post",
    posterId: "2"
  },
  {
    id: "18",
    title: "Eighteenth Post",
    tags: [],
    content: "This is the eighteenth post",
    posterId: "3"
  },
  {
    id: "19",
    title: "Nineteenth Post",
    tags: [],
    content: "This is the nineteenth post",
    posterId: "1"
  },
  {
    id: "20",
    title: "Twentieth Post",
    tags: [],
    content: "This is the twentieth post",
    posterId: "2"
  },
  {
    id: "21",
    title: "Twenty-First Post",
    tags: [],
    content: "This is the twenty-first post",
    posterId: "3"
  },
  {
    id: "22",
    title: "Twenty-Second Post",
    tags: [],
    content: "This is the twenty-second post",
    posterId: "1"
  }
]

export default function mockPosts(server: Server) {
  server.post("posts", (schema: any, { requestBody }) => {
    const post = schema.posts.create(JSON.parse(requestBody))
    return { ...post.attrs, id: parseInt(post.id) }
  })

  server.get("posts", (schema: any, { queryParams }) => {
    const posts = schema.posts.all().models as any[]
    const page = JSON.parse(queryParams.page) as number
    const size = JSON.parse(queryParams.size) as number
    const sortAscending = JSON.parse(queryParams.sortAscending) as boolean

    if (queryParams.posterIds !== undefined) {
    const posterIds = JSON.parse(queryParams.posterIds) as number
    }

    return new Response(
      200,
      { "X-Total-Count": JSON.stringify(posts.length) },
      JSON.stringify(
        posts
          .sort((lhs: any, rhs: any) => (sortAscending ? lhs.id - rhs.id : rhs.id - lhs.id))
          .slice(page * size, (page + 1) * size)
          .map((model) => ({ ...model.attrs, id: parseInt(model.id) }))
      )
    )
  })

  server.delete("posts/:id", (schema: any, { params }) => {
    return schema.posts.find(params.id).destroy()
  })
}
