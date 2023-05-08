import { type Request, createServer, Model, IdentityManager, Response } from "miragejs"
import type ContentPost from "../features/posts/types/ContentPost"

export default function mockAPI(): void {
  createServer({
    environment: "development",
    identityManagers: {
      application: IdentityManager
    },
    models: {
      post: Model
    },
    namespace: "/api/v1/",
    seeds(server) {
      createExamplePosts(server)
    },
    routes() {
      this.post("posts", mockCreatingPost)
      this.get("posts", mockFetchingPosts)
      this.delete("posts/:id", mockDeletingPost)

      this.get("students/:studentId/profile", mockGettingProfile)
      this.put("students/:studentId/profile", mockUpdatingProfile)

      this.post("students", mockSignUp)
      this.post("signin", mockSignIn)

      this.get("chat/messages", (schema) => {
        return schema.db.messages
      })

      this.post("chat/messages", (schema, request) => {
        const message = JSON.parse(request.requestBody)
        schema.db.messages.insert(message)
        return schema.db.messages
      })
    }
  })
}

const createExamplePosts = (server: any): void => {
  for (let i = 0; i < 10; i++)
    server.create("post", {
      id: i.toString(),
      title: "A post",
      tags: [i.toString()],
      content:
        "An example post, that could contain some text like this.\n And possibly even more (eventually). Whatever it's gonna be fine, it's alright…",
      posterId: i % 3
    })
}

const mockCreatingPost = (schema: any, { requestBody }: Request): Response => {
  const json = JSON.parse(requestBody)
  const newPost: ContentPost = {
    id: schema.posts.all().length,
    title: json.title,
    tags: json.tags,
    content: json.content,
    posterId: json.posterId
  }
  schema.posts.create(newPost)
  return new Response(200, {}, JSON.stringify(newPost))
}

const mockFetchingPosts = (schema: any, { queryParams }: Request): Response =>
  new Response(
    200,
    {},
    JSON.stringify(
      (schema.posts.all().models as any[])
        .map((model) => ({ ...model.attrs, id: parseInt(model.id) }))
        .sort((lhs: any, rhs: any) =>
          (JSON.parse(queryParams.sortAscending) as boolean) ? lhs.id - rhs.id : rhs.id - lhs.id
        )
    )
  )

const mockDeletingPost = (schema: any, { params }: Request): any => {
  return schema.posts.find(params.id).destroy()
}

const mockSignUp = (schema: any, req: Request): any => ({
  id: 1,
  name: "name",
  email: "email",
  token: "xyz123",
  type: "Bearer"
})

const mockSignIn = (schema: any, req: Request): any => ({
  id: 1,
  name: "name",
  email: "email",
  token: "xyz123",
  type: "Bearer"
})

const mockGettingProfile = (schema: any, req: Request): Response => {
  if (req.params.studentId === "1")
    return new Response(
      200,
      {},
      {
        name: "Jessica",
        bio: "Life is a mixture of emotions. There are times when things are gloomy and we are sad, while there are times when good things happen and our heart gets uplifted with positive vibes. But, always remember that we shouldn’t let our sad times derail our positive energy and keep us down.",
        icon: "School"
      }
    )
  else return new Response(404)
}

const mockUpdatingProfile = (schema: any, { requestBody }: Request): any => {
  const json = JSON.parse(requestBody)
  return {
    name: json.newName ?? "Jessica",
    bio:
      json.newBio ??
      "Life is a mixture of emotions. There are times when things are gloomy and we are sad, while there are times when good things happen and our heart gets uplifted with positive vibes. But, always remember that we shouldn’t let our sad times derail our positive energy and keep us down.",
    icon: json.newIcon ?? "School"
  }
}
