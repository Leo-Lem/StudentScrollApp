import { type Request, createServer, Model, IdentityManager, Response } from "miragejs"

import { type ContentPost } from "../models"

export default function mockAPI(): void {
  createServer({
    environment: "development",
    identityManagers: {
      application: IdentityManager
    },
    models: {
      student: Model,
      post: Model
    },
    seeds(server) {
      createExamplePosts(server)
    },
    routes() {
      this.post("api/v1/posts", mockCreatingPost)
      this.get("api/v1/posts", mockFetchingPosts)
      this.delete("api/v1/posts/:id", mockDeletingPost)
      this.post("api/v1/students", mockSignUp)
      this.post("api/v1/signin", mockSignIn)
      this.get("api/v1/students/:id/profile", mockGettingProfile)
      this.put("api/v1/students/:id/profile", mockUpdatingProfile)
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

const mockCreatingPost = (schema: any, { requestBody }: Request): ContentPost =>
  schema.posts.create(JSON.parse(requestBody))

const mockFetchingPosts = (schema: any, { queryParams }: Request): Response =>
  new Response(
    200,
    {},
    JSON.stringify(
      (schema.posts.all().models as any[])
        .map((model) => ({ ...model.attrs, id: parseInt(model.id) }))
        .sort((lhs: any, rhs: any) =>
          (JSON.parse(queryParams.sortAscending) as boolean)
            ? lhs.id - rhs.id
            : rhs.id - lhs.id
        )
    )
  )

const mockDeletingPost = (schema: any, { params }: Request): any => {
  return schema.posts.find(params.id).destroy()
}

const mockSignUp = (): any => ({
  id: 1,
  name: "name",
  email: "email",
  token: "xyz123",
  type: "Bearer"
})

const mockSignIn = (): any => ({
  id: 1,
  name: "name",
  email: "email",
  token: "xyz123",
  type: "Bearer"
})

const mockGettingProfile = (): any => ({
  name: "Jessica",
  bio: "Life is a mixture of emotions. There are times when things are gloomy and we are sad, while there are times when good things happen and our heart gets uplifted with positive vibes. But, always remember that we shouldn’t let our sad times derail our positive energy and keep us down.",
  icon: "School"
})

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